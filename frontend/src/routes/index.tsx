import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "../components/theme-provider";
// import BlogList from "../components/BlogList";
import Navbar from "@/components/NavBar";

export const Route = createFileRoute("/")({
  component: Index,
});


function Index() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
      </div>
    </ThemeProvider>
  );
}
