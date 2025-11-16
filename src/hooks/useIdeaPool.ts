"use client";

import { useState, useMemo, useCallback } from 'react';
import type { Idea } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

const initialIdeas: Idea[] = [
  {
    id: 1,
    text: "A decentralized social network where users truly own their data and connections.",
    author: "0xAbc...123",
    weight: 25,
    timestamp: Date.now() - 1000 * 60 * 60 * 2,
    badgeLevel: 2,
  },
  {
    id: 2,
    text: "A platform for fractional ownership of real-world assets, tokenized on the blockchain.",
    author: "0xDef...456",
    weight: 150,
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    badgeLevel: 3,
  },
  {
    id: 3,
    text: "An AI-powered DeFi protocol that automatically optimizes yield farming strategies.",
    author: "0xGhi...789",
    weight: 8,
    timestamp: Date.now() - 1000 * 60 * 30,
    badgeLevel: 0,
  },
];

const BADGE_THRESHOLDS = {
  LEVEL_1: 10,
  LEVEL_2: 50,
  LEVEL_3: 200,
};

export const useIdeaPool = () => {
  const [ideas, setIdeas] = useState<Idea[]>(initialIdeas);
  const { toast } = useToast();
  // A placeholder for the connected user's address
  const address = "0xUser...1234"


  const sortedIdeas = useMemo(() => {
    return [...ideas].sort((a, b) => b.weight - a.weight);
  }, [ideas]);

  const getBadgeLevel = (weight: number) => {
    if (weight >= BADGE_THRESHOLDS.LEVEL_3) return 3;
    if (weight >= BADGE_THRESHOLDS.LEVEL_2) return 2;
    if (weight >= BADGE_THRESHOLDS.LEVEL_1) return 1;
    return 0;
  };

  const submitIdea = useCallback((text: string) => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Idea text cannot be empty.",
        variant: "destructive",
      });
      return;
    }
    const newIdea: Idea = {
      id: Date.now(),
      text,
      author: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "0x...",
      weight: 0,
      timestamp: Date.now(),
      badgeLevel: 0,
    };
    setIdeas((prev) => [newIdea, ...prev]);
    toast({
        title: "Success!",
        description: "Your idea has been submitted to the pool.",
      });
  }, [toast, address]);

  const stakeAttention = useCallback((ideaId: number, amount: number) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const newWeight = idea.weight + amount;
          const newBadgeLevel = getBadgeLevel(newWeight);
          
          if (newBadgeLevel > idea.badgeLevel) {
            toast({
                title: `Badge Unlocked! 🎉`,
                description: `Your idea has reached Level ${newBadgeLevel} Proof of Thought!`,
              });
          }

          return {
            ...idea,
            weight: newWeight,
            badgeLevel: newBadgeLevel,
          };
        }
        return idea;
      })
    );
  }, [toast]);

  return { ideas: sortedIdeas, submitIdea, stakeAttention };
};
