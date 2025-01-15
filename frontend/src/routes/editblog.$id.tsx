import { createFileRoute } from "@tanstack/react-router";
import { EditBlogForm } from "@/components/EditBlogForm";
import { BlogPost } from "@/types/blogs";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/editblog/$id")({
  component: EditBlogPage,
});

function EditBlogPage() {
  const { id } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog post");

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError("Failed to fetch blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error || "Post not found"}</div>
      </div>
    );
  }

  return <EditBlogForm post={post} />;
}
