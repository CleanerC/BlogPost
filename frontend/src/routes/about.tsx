import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Introduction */}
        <Card>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-2xl font-medium">👋 Hi !</p>
              <p className="text-xl">I'm David Xiang</p>
              <p className="text-lg text-muted-foreground">
                A junior at Boston University, Majoring in Computer Engineering
              </p>
              <p className="text-lg">
                I'm passionate about technology and currently exploring web
                development
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <BookOpen className="w-6 h-6" />
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Boston University</h3>
              <p className="text-muted-foreground">Computer Engineering</p>
              <div className="mt-4">
                <p className="font-medium">Key Courses Completed:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1 text-muted-foreground">
                  <li>Introduction to Cybersecurity</li>
                  <li>Cloud Computing</li>
                  <li>Operating Systems</li>
                  <li>Computer Networking</li>
                  <li>Computer Organization</li>
                  <li>......</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Learning */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Code className="w-6 h-6" />
            <CardTitle>Current Focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Web Development Journey</h3>
              <p className="text-muted-foreground">
                I've been diving into web development for the past 3 months,
                learning:
              </p>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-medium">Frontend</h4>
                  <p className="text-sm text-muted-foreground">
                    React, TypeScript, TailwindCSS
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <h4 className="font-medium">Backend</h4>
                  <p className="text-sm text-muted-foreground">
                    APIs, Databases, Server Architecture
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connect */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2">
            <Globe className="w-6 h-6" />
            <CardTitle>Let's Connect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                🚧 Contact form functionality is under construction. Waiting for
                domain setup to enable email services.
              </p>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Your name"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="your@email.com"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  placeholder="Your message"
                  disabled
                />
              </div>

              <Button type="submit" className="w-full" disabled>
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
