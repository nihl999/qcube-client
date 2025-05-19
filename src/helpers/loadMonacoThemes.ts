import type { TTheme } from '@/store/editor'
import type { editor } from 'monaco-editor'
export type MonacoThemeData = editor.IStandaloneThemeData

export async function loadMonacoThemes() {
  const themeModules = import.meta.glob<MonacoThemeData>(
    '/src/monaco-themes/*.json',
  )

  const themePromises: Promise<[string, MonacoThemeData]>[] = Object.entries(
    themeModules,
  ).flatMap(([path, loader]) => {
    const themeName = path.split('/').pop()?.replace('.json', '')
    if (!themeName) return []
    return [loader().then((themeData) => [themeName, themeData])]
  })

  const themeEntries = await Promise.all(themePromises)

  return themeEntries
}

export function genMonacoThemeName(jsonName: string) {
  const words = jsonName.replace('-', ' ').split(' ')
  const separatedName = words.map((word) => {
    const splittedWord = word.split('')
    splittedWord[0] = splittedWord[0].toUpperCase()
    return splittedWord.join('')
  })
  return separatedName.join(' ')
}
