import { sidebarStore } from '@/store/sidebar'
import { createFileRoute, Navigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent()
{
  return <div>Index</div>//<Navigate to="/editor" replace />
}
