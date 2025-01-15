import { createFileRoute } from "@tanstack/react-router";
import BlogList from "@/components/BlogList";
import Navbar from "@/components/NavBar";

export const Route = createFileRoute("/blogs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-2 pb-8">
        <BlogList />
      </main>
    </div>
  );
}