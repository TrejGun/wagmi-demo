import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "../components/layout";
import { ThemeProvider } from "../components/theme-provider";
import { WalletProvider } from "../components/wallet-provider";
import { Lessons } from "./lessons/lessons";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeProvider>
        <WalletProvider>
          <Layout />
        </WalletProvider>
      </ThemeProvider>
    ),
    children: [
      { index: true, element: <Lessons /> },
    ],
  },
]);

export const App: FC = () => {
  return <RouterProvider router={router} />;
};
