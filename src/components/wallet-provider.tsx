import { FC, PropsWithChildren } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { metaMask } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { defineChain } from "viem";

export const gemunion = defineChain({
  id: 10001,
  name: "Gemunion",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545/"],
    },
  },
});

const config = createConfig({
  chains: [gemunion],
  connectors: [metaMask()],
  transports: {
    [gemunion.id]: http(),
  },
});

const queryClient = new QueryClient();

export const WalletProvider: FC<PropsWithChildren> = props => {
  const { children } = props;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};
