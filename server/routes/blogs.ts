import { Hono } from "hono"
import { z } from "zod"
import { zValidator } from "@hono/zod-validator"

// type Blog = {
//     id: number;
//     author: string,
//     title: string,
//     excerpt: string,
//     content: string,
//     date: Date
// }

const blogSchema = z.object({
    id: z.number(),
    author: z.string(),
    title: z.string().min(5).max(100),
    excerpt: z.string().min(20).max(200),
    content: z.string(),
    date: z.date()
})

const createBlogSchema = blogSchema.omit({id: true, author: true, date: true})

type Blog = z.infer<typeof blogSchema>

export const blogsRoute = new Hono()

// .get("/", (c) => {
//     return c.json({blogs: testingData})
// })

// .post("/", zValidator('json', createBlogSchema) ,async (c) => {
//     const data = await c.req.valid('json')
//     const blog = createBlogSchema.parse(data)   //zod runtime check
//     console.log("new post: ", {blog})
//     return c.json(blog)
// })

// .get("/:id{[0-9]+}", (c) => {
//     const id = Number.parseInt(c.req.param("id"))

//     const blog = //database stuff

//     return c.json({blog})
// })

// .delete()
// .put