import { FC } from "react";
import { useAccount } from "wagmi";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";

export const Lesson1: FC<ITabPanelProps> = props => {
  const { address, chain } = useAccount();

  return (
    <TabPanel {...props}>
      Account: {address} , {chain?.name || "Unknown"}
    </TabPanel>
  );
};
