import type { BlogPost } from "@/types/blogs";
import { getBlogs } from "@/api/blogs";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const posts = await getBlogs();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []); // Added dependency array to prevent infinite loop

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-4/5 mx-auto py-8">
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="cursor-pointer"
            onClick={() => window.location.href = `/blog/${post.id}`}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold cursor-pointer">
                    {post.title}
                  </h2>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>

                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">By {post.author}</span>
                  <time 
                    dateTime={post.date}
                    className="text-muted-foreground"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}