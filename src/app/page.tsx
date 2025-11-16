"use client";

import { Header } from "@/components/layout/Header";
import { Background } from "@/components/layout/Background";
import { IdeaForm } from "@/components/ideas/IdeaForm";
import { IdeaPool } from "@/components/ideas/IdeaPool";
import { TopIdeasSummary } from "@/components/ideas/TopIdeasSummary";
import { useIdeaPool } from "@/hooks/useIdeaPool";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const { ideas, submitIdea, stakeAttention } = useIdeaPool();

  return (
    <>
      <Background />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="container mx-auto flex-1 px-4 py-8 md:px-6 lg:py-12">
          <div className="mx-auto max-w-4xl">
            <section id="submit-idea" className="mb-12">
              <IdeaForm onSubmit={submitIdea} />
            </section>

            <section id="top-ideas" className="mb-12">
                <TopIdeasSummary ideas={ideas} />
            </section>
            
            <Separator className="my-8 bg-border/20" />

            <section id="idea-pool">
              <h2 className="mb-6 font-headline text-3xl font-bold tracking-tighter text-primary sm:text-4xl md:text-5xl">
                Idea Pool
              </h2>
              <IdeaPool ideas={ideas} onStake={stakeAttention} />
            </section>
          </div>
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground">
          Built for the new age of ideas. &copy; {new Date().getFullYear()} IdeaRise.
        </footer>
      </div>
    </>
  );
}
