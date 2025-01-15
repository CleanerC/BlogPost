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
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="grid gap-6">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="group cursor-pointer"
            onClick={() => window.location.href = `/blog/${post.id}`}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="p-6">
                <div className="space-y-2">
                  <time 
                    dateTime={post.date.toString()}
                    className="text-sm text-gray-500"
                  >
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  
                  <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent group-hover:from-primary-500 group-hover:to-primary transition-colors duration-200">
                    {post.title}
                  </h2>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0">
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="text-sm text-gray-500">
                  Topic: {post.topic}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}