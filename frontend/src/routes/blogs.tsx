import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "../components/theme-provider";
import BlogList from "@/components/BlogList";
import Navbar from "@/components/NavBar";

export const Route = createFileRoute("/blogs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-20 pb-8">
          <BlogList />
        </main>
      </div>
    </ThemeProvider>
  );
}
