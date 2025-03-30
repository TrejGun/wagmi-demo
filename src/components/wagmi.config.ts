import { defineChain } from "viem";
import { createConfig, http } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const ethberry = defineChain({
  id: 10000,
  name: "Besu",
  nativeCurrency: {
    name: "Besu",
    symbol: "BESU",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Ethereum Lite Explorer",
      url: "http://127.0.0.1:8080/",
    },
  },
});

export const config = createConfig({
  chains: [mainnet, polygon, ethberry],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [ethberry.id]: http(),
  },
});
