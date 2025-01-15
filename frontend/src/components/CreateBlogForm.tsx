import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface FormData {
  title: string;
  excerpt: string;
  content: string;
  topic: Topic;
}

const TOPICS = ['Work', 'Daily', 'Hobby'] as const;
type Topic = 'work' | 'daily' | 'hobby';

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<FormData>({
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      topic: 'daily'
    }
  });

  const onSubmit = async (data: FormData) => {
    setError(null);

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog post');
      }

      navigate({ to: '/' });
    } catch (err) {
      setError('Failed to create blog post. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-2xl mx-auto mt-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Create New Blog Post</CardTitle>
                          <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem className="w-[180px]">
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TOPICS.map((topic) => (
                        <SelectItem key={topic} value={topic.toLowerCase()}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                rules={{
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters"
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must be less than 100 characters"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your blog title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="excerpt"
                rules={{
                  required: "Excerpt is required",
                  minLength: {
                    value: 20,
                    message: "Excerpt must be at least 20 characters"
                  },
                  maxLength: {
                    value: 200,
                    message: "Excerpt must be less than 200 characters"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write a brief summary of your blog post"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                rules={{
                  required: "Content is required"
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your blog post content"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: '/' })}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};

export default CreateBlogForm;