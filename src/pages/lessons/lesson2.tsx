import { FC } from "react";
import { useSwitchChain } from "wagmi";
import { Chain } from "wagmi/chains";
import { Button, ButtonGroup } from "@mui/material";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";

export const Lesson2: FC<ITabPanelProps> = props => {
  const { chains, switchChain } = useSwitchChain();

  const handleClick = (chain: Chain) => {
    return () => {
      switchChain({ chainId: chain.id });
    };
  };

  return (
    <TabPanel {...props}>
      <ButtonGroup>
        {chains.map(chain => (
          <Button variant="outlined" key={chain.id} onClick={handleClick(chain)}>
            {chain.name}
          </Button>
        ))}
      </ButtonGroup>
    </TabPanel>
  );
};
