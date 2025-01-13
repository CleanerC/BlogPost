import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute bottom-0 right-0">
        <ModeToggle/>
      </div>
    </ThemeProvider>
  );
}

export default App;
