import { Outlet, createRootRouteWithContext, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import TanstackQueryLayout from '@/integrations/tanstack-query/layout'

import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ThemeProvider } from '@/integrations/theme/theme-provider'
import type { QueryClient } from '@tanstack/react-query'
import { useMonaco } from '@monaco-editor/react'
import { useStore } from '@tanstack/react-store'
import { genMonacoThemeName, loadMonacoThemes } from '../helpers/loadMonacoThemes.ts'
import { defaultThemes, editorStore, type TTheme } from '../store/editor.tsx'
import { sidebarStore } from '../store/sidebar.tsx'
import { useEffect } from 'react'

interface MyRouterContext
{
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () =>
  {
    const monaco = useMonaco()
    const { location } = useRouterState()
    const editorState = useStore(editorStore)
    const sidebarShouldAppear = useStore(sidebarStore, (store) => store.shouldAppear)
    if (monaco && !editorState.themesLoaded)
    {
      loadMonacoThemes().then((themes) =>
      {
        const themeKeys: TTheme[] = []
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

    // useEffect(() =>
    // {
    //   sidebarStore.setState((store) => ({ ...store, content: null }))
    // }, [location.pathname])

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
