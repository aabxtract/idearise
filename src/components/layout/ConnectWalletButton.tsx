"use client";

import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function ConnectWalletButton() {
  return (
    <Button>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
