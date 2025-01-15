import { createFileRoute } from '@tanstack/react-router'
import CreateBlogForm from '@/components/CreateBlogForm'

export const Route = createFileRoute('/createblog')({
  component: CreateBlog,
})

function CreateBlog() {
  return (
    <div className='container py-8'>
      <CreateBlogForm />
    </div>
  )
}
