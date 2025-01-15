import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const blogsRoute = new Hono();

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
  log: ['query', 'error', 'warn']
})

const blogSchema = z.object({
  id: z.number(),
  title: z.string().min(5).max(100),
  excerpt: z.string().min(20).max(200),
  content: z.string(),
  date: z.date(),
  topic: z.string(),
  pinned: z.boolean().default(false) 
});

const createBlogSchema = blogSchema.omit({
  id: true,
  date: true,
});

blogsRoute.get("/", async (c) => {
  try {
    console.log('Starting database query...');
    const posts = await prisma.post.findMany({
      orderBy: [
        { pinned: 'desc' }, 
        { date: 'desc' }, 
      ],
    });
    console.log('Query successful, posts:', posts.length);
    return c.json(posts);
  } catch (error) {
    console.error('Detailed database error:', error);
    return c.json({ 
      error: "Failed to fetch posts", 
    }, 500);
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
                topic: data.topic,
                pinned: data.pinned ?? false
            }
        })
        return c.json(post, 201)
    } catch (error) {
        console.error("Failed to create post:", error)
        return c.json({error: "failed to create post"}, 500)
    }
});

blogsRoute.put("/:id{[0-9]+}", zValidator("json", createBlogSchema), async (c) => {
  try {
      const id = Number.parseInt(c.req.param("id"))
      const data = await c.req.valid('json')


      const existingPost = await prisma.post.findUnique({
          where: { id }
      })

      if (!existingPost) {
          return c.json({ error: "Post not found" }, 404)
      }


      const updatedPost = await prisma.post.update({
          where: { id },
          data: {
              title: data.title,
              excerpt: data.excerpt,
              content: data.content,
              topic: data.topic,
              pinned: data.pinned ?? existingPost.pinned
          }
      })

      return c.json(updatedPost)
  } catch (error) {
      console.error("Failed to update post:", error)
      return c.json({ error: "Failed to update post" }, 500)
  }
});

blogsRoute.delete("/:id{[0-9]+}", async (c) => {
  try {
      const id = Number.parseInt(c.req.param("id"))

      const existingPost = await prisma.post.findUnique({
          where: { id }
      })

      if (!existingPost) {
          return c.json({ error: "Post not found" }, 404)
      }

      await prisma.post.delete({
          where: { id }
      })

      return c.json({ message: "Post deleted successfully" }, 200)
  } catch (error) {
      console.error("Failed to delete post:", error)
      return c.json({ error: "Failed to delete post" }, 500)
  }
});