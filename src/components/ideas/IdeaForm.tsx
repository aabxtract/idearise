"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

interface IdeaFormProps {
  onSubmit: (text: string) => void;
}

export function IdeaForm({ onSubmit }: IdeaFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
    setText("");
  };

  return (
    <Card className="border-primary/20 bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">
          Drop your next great idea
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="A decentralized autonomous organization for funding public goods..."
            className="h-28 resize-none bg-background/50 focus:ring-primary"
            required
          />
          <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" size="lg">
            <Send className="mr-2 h-4 w-4" />
            Submit Idea
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
