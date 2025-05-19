import { Store } from '@tanstack/react-store';

export type TTheme = {
    name: string;
    code: string;
    bgColor: string;
    default?: boolean
}

export const defaultThemes: TTheme[] = [
    { name: 'Dark', code: 'vs-dark', bgColor: '#1e1e1e', default: true },
]

export const editorStore = new Store({
    get content() 
    {
        const savedContent = localStorage.getItem('@yamlida/editor-content')
        if (savedContent !== null) return savedContent
        localStorage.setItem('@yamlida/editor-content', '')
        return ''
    },
    themes: [] as TTheme[],
    _currentTheme: defaultThemes[0],
    firstLoad: true,
    get currentTheme()
    {
        if (this.firstLoad)
        {
            const savedThemeCode = localStorage.getItem('@yamlida/editor-theme')
            if (savedThemeCode !== null)
            {
                const theme = editorStore.state.themes.find((theme) => theme.code === savedThemeCode)
                if (theme)
                {
                    editorStore.setState((state) => ({ ...state, _currentTheme: theme }))
                    return theme
                }
            }
            localStorage.setItem('@yamlida/editor-theme', this._currentTheme.code)

        }
        return this._currentTheme
    },
    themesLoaded: false,
    setContent: (content: string) =>
    {
        editorStore.setState((store) => ({ ...store, content }));
    },
    persistContent: () =>
    {
        localStorage.setItem('@yamlida/editor-content', editorStore.state.content)
    },
    setThemes: (themes: TTheme[]) =>
    {
        editorStore.setState((store) => ({ ...store, themes }));

    },
    setCurrentTheme: (theme: string) =>
    {
        editorStore.setState((store) =>
        {
            const foundTheme = store.themes.find(loadedTheme => loadedTheme.code == theme)
            const setTheme = foundTheme ? foundTheme : defaultThemes[0]
            localStorage.setItem('@yamlida/editor-theme', setTheme.code)
            return { ...store, _currentTheme: setTheme }
        });
    },
    setThemesLoaded: (loaded: boolean) =>
    {
        editorStore.setState((store) => ({ ...store, themesLoaded: loaded }));
    }
})