import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TEditorTheme = {
    name: string
    code: string
    bgColor: string
    default?: boolean
}

export const defaultThemes: TEditorTheme[] = [
    { name: 'Dark', code: 'vs-dark', bgColor: '#1e1e1e', default: true },
]

type TEditorState = {
    content: string
    themes: TEditorTheme[]
    currentTheme: TEditorTheme
    themesLoaded: boolean
    loadFromPersist(): void
    setContent(content: string): void
    setThemes(themes: TEditorTheme[]): void
    setCurrentTheme(theme: string): void
    setThemesLoaded(loaded: boolean): void
    version: number
}

export const useEditorState = create<TEditorState>()(
    persist(
        (set, get) => ({
            version: 0,
            loadFromPersist()
            {
                const savedContent = localStorage.getItem('@yamlida/editor-content')
                const savedThemeCode = localStorage.getItem('@yamlida/editor-theme')
                const theme = get().themes.find(
                    (theme) => theme.code === savedThemeCode,
                )
            },
            content: '',
            themes: [],
            currentTheme: defaultThemes[0],
            themesLoaded: false,
            setContent(content: string)
            {
                set((store) => ({ ...store, content }))
            },
            setThemes(themes: TEditorTheme[])
            {
                set(() => ({ themes }))
            },
            setCurrentTheme(theme: string)
            {
                set((store) =>
                {
                    const foundTheme = store.themes.find(
                        (loadedTheme) => loadedTheme.code == theme,
                    )
                    const setTheme = foundTheme ? foundTheme : defaultThemes[0]
                    return { currentTheme: setTheme }
                })
            },
            setThemesLoaded(loaded: boolean)
            {
                set((store) => ({ ...store, themesLoaded: loaded }))
            },
        }),
        {
            name: '@yamlida/editor',
            version: 0,
            partialize(state)
            {
                const { themesLoaded, ...save } = state
                return save
            }
        },
    ),
)
