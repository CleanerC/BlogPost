import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import BlogList from "./components/BlogList";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <nav className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">My Blog</h1>
            <ModeToggle />
          </div>
        </nav>
        
        <main className="pt-20 pb-8">
          <BlogList />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
