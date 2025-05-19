import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanstackQueryLayout from '@/integrations/tanstack-query/layout'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/integrations/theme/theme-provider'
import { useMonaco } from '@monaco-editor/react'
import type { QueryClient } from '@tanstack/react-query'
import { genMonacoThemeName, loadMonacoThemes } from '../helpers/loadMonacoThemes.ts'
import { defaultThemes, useEditorState, type TEditorTheme } from '../store/editor.tsx'
import { useSidebarState } from '../store/sidebar.tsx'

interface MyRouterContext
{
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () =>
  {
    const monaco = useMonaco()
    const editorState = useEditorState()
    const sidebarShouldAppear = useSidebarState((state) => state.shouldAppear)
    if (monaco && !editorState.themesLoaded)
    {
      loadMonacoThemes().then((themes) =>
      {
        const themeKeys: TEditorTheme[] = []
        themes.forEach(theme =>
        {
          monaco.editor.defineTheme(theme[0], theme[1])
          themeKeys.push({
            name: genMonacoThemeName(theme[0]),
            code: theme[0],
            bgColor: theme[1].colors['editor.background']
          }
          )
        })
        editorState.setThemesLoaded(true)
        editorState.setThemes([...defaultThemes, ...themeKeys])
      })
    }

    return <>
      <ThemeProvider>
        <SidebarProvider>
          {sidebarShouldAppear ? < AppSidebar /> : null}
          <main className="flex flex-col w-full mx-auto h-screen overflow-hidden">
            <Outlet />
          </main>
        </SidebarProvider>
        <TanStackRouterDevtools />
        <TanstackQueryLayout />
      </ThemeProvider>
    </>
  },
})
