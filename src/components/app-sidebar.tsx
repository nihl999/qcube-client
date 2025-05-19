
import
{
    Sidebar
} from "@/components/ui/sidebar"
import { useSidebarState } from "@/store/sidebar"



export function AppSidebar()
{
    const sidebarContent = useSidebarState((state) => state.content)
    return (
        <Sidebar>
            {sidebarContent}
        </Sidebar>
    )
}
