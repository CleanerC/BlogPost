import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const blogsRoute = new Hono();
const prisma = new PrismaClient();

const blogSchema = z.object({
  id: z.number(),
  author: z.string(),
  title: z.string().min(5).max(100),
  excerpt: z.string().min(20).max(200),
  content: z.string(),
  date: z.date(),
});
const createBlogSchema = blogSchema.omit({
  id: true,
  date: true,
});
// type Blog = z.infer<typeof blogSchema>;

blogsRoute.get("/", async (c) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        date: 'desc',
      },
    });
    return c.json(posts);
  } catch (error) {
    return c.json({ error: "Failed to fetch posts" }, 500);
  }
});

blogsRoute.get("/:id{[0-9]+}", async (c) => {
    try {
        const id = Number.parseInt(c.req.param("id"))

        const post = await prisma.post.findUnique({
            where: {id}
        })
        if (!post) {
            return c.json({error: "post not found"}, 404)
        }

        return c.json(post)
    } catch (error) {
        return c.json({error: "failed to fetch post"}, 500)
    }
})

blogsRoute.post("/", zValidator("json", createBlogSchema), async (c) => {
    try {
        const data = await c.req.valid('json')
        const post = await prisma.post.create({
            data: {
                title: data.title,
                excerpt: data.excerpt,
                content: data.content,
                author: "testBackendTempUser"
            }
        })
        return c.json(post, 201)
    } catch (error) {
        console.error("Failed to create post:", error)
        return c.json({error: "failed to create psot"}, 500)
    }
});


//.put
//.delete