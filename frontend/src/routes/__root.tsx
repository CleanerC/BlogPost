import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/NavBar";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
    component: () => (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col min-h-screen bg-background text-foreground">
          {/* Fixed navbar */}
          <Navbar />
          {/* Main content area that starts after navbar */}
          <main className="flex-1 mt-16"> {/* mt-16 matches navbar height */}
            <Outlet />
          </main>
          {import.meta.env.DEV && <TanStackRouterDevtools />}
        </div>
      </ThemeProvider>
    ),
  });