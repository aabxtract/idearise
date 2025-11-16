"use client";

import { useEffect, useState } from "react";
import { Sparkles, Award, Trophy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ProofOfThoughtBadgeProps {
  level: number;
}

const badgeConfig = {
  0: { label: null, icon: null, color: "" },
  1: { label: "Level 1: Spark", icon: Sparkles, color: "text-cyan-400" },
  2: { label: "Level 2: Innovator", icon: Award, color: "text-amber-400" },
  3: { label: "Level 3: Visionary", icon: Trophy, color: "text-fuchsia-500" },
};

export function ProofOfThoughtBadge({ level }: ProofOfThoughtBadgeProps) {
  const [isNew, setIsNew] = useState(false);
  const config = badgeConfig[level as keyof typeof badgeConfig] || badgeConfig[0];

  useEffect(() => {
    if (level > 0) {
      setIsNew(true);
      const timer = setTimeout(() => setIsNew(false), 2000); // Animation duration
      return () => clearTimeout(timer);
    }
  }, [level]);

  if (!config.icon || !config.label) {
    return null;
  }

  const Icon = config.icon;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full bg-secondary",
              isNew && "animate-[glow_2s_ease-in-out]"
            )}
          >
            <Icon className={cn("h-5 w-5", config.color)} />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-semibold">Proof of Thought: {config.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
