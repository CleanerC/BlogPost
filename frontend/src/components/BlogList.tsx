import type { BlogPost } from "@/types/blogs";
import { getBlogs } from "@/api/blogs";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const posts = await getBlogs();
        // Extract unique topics
        const uniqueTopics = Array.from(new Set(posts.map(post => post.topic)));
        setTopics(uniqueTopics);
        
        // Sort posts: pinned first, then by date
        const sortedPosts = posts.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        setBlogPosts(sortedPosts);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const filteredPosts = selectedTopic === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.topic === selectedTopic);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 sm:px-6">
      {/* Topic Filter */}
      <div className="mb-6">
        <Select 
          value={selectedTopic} 
          onValueChange={setSelectedTopic}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="group cursor-pointer relative"
            onClick={() => window.location.href = `/showblog/${post.id}`}
          >
            <Card 
              className={`hover:shadow-lg transition-all duration-300 ${
                post.pinned ? 'border-2 border-primary' : ''
              }`}
            >
              <CardHeader className="p-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {post.pinned && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          <Pin className="w-3 h-3" />
                          <span>Pinned</span>
                        </div>
                      )}
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
                    </div>
                    <Button
                      variant="ghost"
                      className="absolute right-4 top-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`/editblog/${post.id}`, '_blank');
                      }}
                    >
                      Edit
                    </Button>
                  </div>
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