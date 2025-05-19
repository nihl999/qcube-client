
import
{
    Sidebar
} from "@/components/ui/sidebar"
import { sidebarStore } from "@/store/sidebar"
import { useStore } from "@tanstack/react-store"



export function AppSidebar()
{
    const sidebarContent = useStore(sidebarStore, (store) => store.content)
    return (
        <Sidebar>
            {sidebarContent}
        </Sidebar>
    )
}
