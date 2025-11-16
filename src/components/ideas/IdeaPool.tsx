import type { Idea } from "@/lib/types";
import { IdeaCard } from "./IdeaCard";

interface IdeaPoolProps {
  ideas: Idea[];
  onStake: (ideaId: number, amount: number) => void;
}

export function IdeaPool({ ideas, onStake }: IdeaPoolProps) {
  if (ideas.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground">
        The pool is empty. Be the first to submit an idea!
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {ideas.map((idea) => (
        <IdeaCard key={idea.id} idea={idea} onStake={onStake} />
      ))}
    </div>
  );
}
