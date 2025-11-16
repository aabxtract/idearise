"use client";

import { useState } from "react";
import type { Idea } from "@/lib/types";
import { summarizeTopIdeas, type SummarizeTopIdeasOutput } from "@/ai/flows/summarize-top-ideas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader2, AlertTriangle, Quote } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TopIdeasSummaryProps {
  ideas: Idea[];
}

export function TopIdeasSummary({ ideas }: TopIdeasSummaryProps) {
  const [loading, setLoading] = useState(false);
  const [summaries, setSummaries] = useState<SummarizeTopIdeasOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    setSummaries(null);

    try {
      const topIdeas = ideas.slice(0, 3).map((idea) => ({
        text: idea.text,
        author: idea.author,
        weight: idea.weight,
      }));

      if (topIdeas.length === 0) {
        setError("There are no ideas to summarize.");
        setLoading(false);
        return;
      }

      const result = await summarizeTopIdeas({ ideas: topIdeas });
      setSummaries(result);
    } catch (e) {
      setError("Failed to generate summaries. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  
  const getOriginalIdeaText = (summaryIdeaId: number) => {
    return ideas[summaryIdeaId]?.text;
  };


  return (
    <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <Wand2 className="h-10 w-10 shrink-0 text-primary" />
            <div className="flex-1">
                <CardTitle className="font-headline text-2xl text-primary">AI Idea Spotlight</CardTitle>
                <CardDescription>
                Let AI summarize the current top-weighted ideas in the pool.
                </CardDescription>
            </div>
            <Button onClick={handleSummarize} disabled={loading} className="w-full md:w-auto">
            {loading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
                </>
            ) : (
                "Summarize Top Ideas"
            )}
            </Button>
        </div>
      </CardHeader>
      {error && (
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      )}
      {summaries && (
        <CardContent>
            <div className="space-y-4">
                {summaries.map((summary) => (
                <div key={summary.ideaId} className="rounded-lg border border-border/50 bg-background/50 p-4">
                    <p className="text-sm font-medium text-foreground">{summary.summary}</p>
                    <p className="mt-2 flex items-start gap-2 text-xs text-muted-foreground">
                        <Quote className="h-3 w-3 shrink-0 translate-y-0.5" />
                        <span className="truncate">Original: {getOriginalIdeaText(summary.ideaId)}</span>
                    </p>
                </div>
                ))}
            </div>
        </CardContent>
      )}
    </Card>
  );
}
