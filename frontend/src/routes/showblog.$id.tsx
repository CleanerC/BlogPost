import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { BlogPost } from '@/types/blogs';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const Route = createFileRoute('/showblog/$id')({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError('Failed to load blog post. Please try again later.');
        console.error('Error fetching blog:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <Alert>
          <AlertDescription>Blog post not found</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Card>
        <CardHeader className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
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
              <span className="text-sm text-gray-500">
                Topic: {post.topic}
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent">
              {post.title}
            </h1>
            <p className="text-lg text-gray-400 italic">
              {post.excerpt}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 pt-0">
          <div className="prose prose-gray max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-500">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}