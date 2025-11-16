"use client";

import { useAppKit } from "@reown/appkit";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

export function ConnectWalletButton() {
  const { address, isConnected, connect } = useAppKit();

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <Button variant="outline">
        <Wallet className="mr-2 h-4 w-4" />
        {truncateAddress(address)}
      </Button>
    );
  }

  return (
    <Button onClick={() => connect()}>
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
