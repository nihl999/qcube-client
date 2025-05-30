import { CustomSidebarTrigger } from '@/components/sidebar-trigger'
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import { useEditorState } from '@/store/editor'
import MonacoEditor from '@monaco-editor/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useDebounce } from "@uidotdev/usehooks"
import { editor as IEditorNamespace } from 'monaco-editor'
import { useCallback, useEffect, useRef } from 'react'
import EditorThemeSelector from './-components/editor-theme-selector'

export const Route = createFileRoute('/editor/')({
  component: RouteComponent,
})

function RouteComponent()
{
  let editorInstance: IEditorNamespace.IStandaloneCodeEditor | null = null
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorState = useEditorState()
  const debouncedContent = useDebounce(editorState.content, 100)
  const onEditorThemeSelect = useCallback((value: string) =>
    editorState.setCurrentTheme(value), [editorState.currentTheme])
  const { mutate: mutateConformYaml } = useMutation({
    mutationFn: async (yaml: string) =>
    {
      // const response = await fetch('/api/yaml', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ yaml }),
      // })
      console.log(yaml)
    },
    mutationKey: ['yaml'],

  })

  useEffect(() =>
  {
    if (debouncedContent)
    {
      mutateConformYaml(debouncedContent)
    }
  }, [debouncedContent])

  useEffect(() =>
  {
    const resizeObserver = new ResizeObserver(() =>
    {
      if (editorInstance)
      {
        editorInstance.layout();
      }
    });
    if (containerRef.current)
    {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [editorInstance])

  return (
    <div>
      {editorState.themesLoaded ?
        <>
          <div className='flex items-center justify-between' style={{ background: editorState.currentTheme.bgColor }}>
            <CustomSidebarTrigger />
            <EditorThemeSelector onChange={onEditorThemeSelect} defaultValue={editorState.currentTheme.code} themes={editorState.themes} />
          </div>
          <div
            ref={containerRef}
            className="w-full h-full overflow-hidden max-h-screen">

            <MonacoEditor
              language="yaml"
              value={editorState.content}
              height="100%"
              width='100%'
              theme={editorState.currentTheme.code}
              options={{
                minimap: {
                  enabled: false,
                }
              }}
              onChange={(value) =>
              {
                if (value === undefined) return;
                useEditorState.setState((state) => ({ ...state, content: value }))
              }}
              onMount={async (editor, _) =>
              {
                editorInstance = editor as any
              }}
            />
          </div>
        </>
        : null}
    </div >
  )
}


//todo temporary
type HistoryYaml = {
  title: string
  id: number
}

function RouteSidebar()
{
  const { data: historyData, isLoading: historyLoading } = useQuery<HistoryYaml[]>({
    queryKey: ['history'],
    queryFn: async () =>
    {
      return new Promise(resolve => setTimeout(() => resolve([
        {
          title: "my-price-app-service",
          id: 1
        },
        {
          title: "my-price-app-ingress",
          id: 2
        },
        {
          title: "my-price-app-secret",
          id: 3
        },
      ]), 3000))
    },
    staleTime: 1000 * 60 * 30
  })
  if (historyLoading) return null

  return (<SidebarGroup>
    <SidebarContent>
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {historyData!.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarContent>
  </SidebarGroup>)
}