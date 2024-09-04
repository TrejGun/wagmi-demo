import { FC } from "react";
import { useAccount } from "wagmi";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";

export const Lesson1: FC<ITabPanelProps> = props => {
  const account = useAccount();

  return (
    <TabPanel {...props}>
      Lesson 1 - {account.address}
    </TabPanel>
  );
};
