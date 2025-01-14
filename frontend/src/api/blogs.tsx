import type { BlogPost } from "@/types/blogs";

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const res = await fetch('api/blogs', {
      method: 'GET',
    })
    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status}`)
    }
    const data = await res.json();

    return data as BlogPost[]
  } catch (error ) {
    console.error("error:", error)
    return []
  }
}