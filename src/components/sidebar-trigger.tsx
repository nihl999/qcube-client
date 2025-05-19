import { useSidebar } from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { PanelLeftIcon } from "lucide-react"

export function CustomSidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>)
{
  const { toggleSidebar } = useSidebar()

  return <Button
    variant="ghost"
    size="icon"
    className={cn("size-10", className)}
    onClick={toggleSidebar}
    {...props}
  >
    <PanelLeftIcon className="!size-5.5" />
    <span className="sr-only">Toggle Sidebar</span>
  </Button >
}