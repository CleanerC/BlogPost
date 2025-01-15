import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <CardTitle className="text-4xl text-center">
            Hi, I'm David! 👋
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl">Welcome to my blog! ✨</p>
        </CardContent>
      </Card>
    </div>
  );
}
