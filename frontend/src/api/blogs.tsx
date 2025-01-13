import type { BlogPost } from "@/types/blogs";

export async function getBlogs(): Promise<BlogPost[]> {
    try {
        const response = await fetch("api/blogs");
        if(!response.ok ) {
            throw new Error('Failed to fetch blogs');
        }
        return response.json();
    } catch (error) {
        console.log(error)
        throw error
    }
}