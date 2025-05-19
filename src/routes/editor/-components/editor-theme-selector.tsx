import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { TEditorTheme } from "@/store/editor"
import React from "react"

type EditorThemeSelectorProps = {
    onChange: (value: string) => void
    defaultValue: string
    themes: TEditorTheme[]
}

function EditorThemeSelector({
    onChange,
    defaultValue,
    themes
}: EditorThemeSelectorProps)
{
    return (<Select
        onValueChange={
            onChange
        }
        defaultValue={defaultValue}
    >
        <SelectTrigger className="w-3xs m-2">
            <SelectValue placeholder="Editor theme" />
        </SelectTrigger>
        <SelectContent>
            {themes.map((theme) =>
                <SelectItem value={theme.code} key={theme.code}>{theme.name}</SelectItem>
            )}
        </SelectContent>
    </Select>)
}


export default React.memo(EditorThemeSelector)