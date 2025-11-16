"use client";

import type { Idea } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Rocket, UserCircle } from "lucide-react";
import { ProofOfThoughtBadge } from "./ProofOfThoughtBadge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface IdeaCardProps {
  idea: Idea;
  onStake: (ideaId: number, amount: number) => void;
}

export function IdeaCard({ idea, onStake }: IdeaCardProps) {
  const [stakeAmount, setStakeAmount] = useState(10);

  const handleStake = () => {
    onStake(idea.id, stakeAmount);
  };

  return (
    <Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserCircle className="h-4 w-4" />
          <span>{idea.author}</span>
        </div>
        <ProofOfThoughtBadge level={idea.badgeLevel} />
      </CardHeader>
      <CardContent>
        <p className="text-foreground">{idea.text}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between bg-secondary/30 px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="font-headline text-2xl font-bold text-primary">{idea.weight}</span>
          <span className="text-sm text-muted-foreground">Idea Weight</span>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="border-accent bg-transparent text-accent hover:bg-accent hover:text-accent-foreground">
              <Rocket className="mr-2 h-4 w-4" />
              Stake Attention
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-60">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Stake Attention</h4>
                <p className="text-sm text-muted-foreground">
                  Boost this idea's weight.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stake-amount">Amount</Label>
                <Input
                  id="stake-amount"
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full"
                  min="1"
                />
                <Button onClick={handleStake} className="w-full">Stake</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}
