"use client";

import { ReactNode } from "react";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppKitProvider } from "@reown/appkit";
import { appkitWagmiAdapter } from "@reown/appkit-adapter-wagmi";

const config = createConfig({
  chains: [mainnet, sepolia],
  multiInjectedProviderDiscovery: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

const wagmiAdapter = appkitWagmiAdapter({
    wagmiConfig: config,
    queryClient,
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider adapter={wagmiAdapter}>
            {children}
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
