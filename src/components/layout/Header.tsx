import { Lightbulb } from "lucide-react";

export function Header() {
  return (
    <header className="container mx-auto px-4 py-6 md:px-6">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-8 w-8 text-primary" />
          <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary">
            IdeaRise
          </h1>
        </div>
      </div>
    </header>
  );
}
