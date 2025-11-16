import { Lightbulb } from "lucide-react";
import { ConnectWalletButton } from "./ConnectWalletButton";

export function Header() {
  return (
    <header className="container mx-auto flex items-center justify-between px-4 py-6 md:px-6">
      <div className="flex items-center gap-3">
        <Lightbulb className="h-8 w-8 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-primary">
          IdeaRise
        </h1>
      </div>
      <ConnectWalletButton />
    </header>
  );
}
