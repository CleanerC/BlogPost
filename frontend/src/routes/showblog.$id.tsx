import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/showblog/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/showblog/$id"!</div>
}
