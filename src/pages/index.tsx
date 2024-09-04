import { FC } from "react";

import { ThemeProvider } from "../components/theme-provider";
import { WalletProvider } from "../components/wallet-provider";
import { Lessons } from "./lessons/lessons";
import { Header } from "../components/header";

export const App: FC = () => {
  return (
    <ThemeProvider>
      <WalletProvider>
        <Header />
        <Lessons />
      </WalletProvider>
    </ThemeProvider>
  );
};
