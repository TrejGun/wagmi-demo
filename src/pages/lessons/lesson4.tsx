import { FC } from "react";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import { Button } from "@mui/material";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";
import { config } from "../../components/wagmi.config";
import { abi } from "../../utils/Kamasutra.json";

export const Lesson4: FC<ITabPanelProps> = props => {
  const { address } = useAccount();

  const handleClick = async () => {
    const { contractAddress } = JSON.parse(localStorage.getItem("token") || "{}");

    const result = await readContract(config, {
      abi,
      address: contractAddress,
      functionName: "balanceOf",
      args: [address],
    });

    console.log(`balance - ${result}`);
  };

  return (
    <TabPanel {...props}>
      <Button
        variant="outlined"
        onClick={handleClick}
      >
        Get balance
      </Button>
    </TabPanel>
  );
};
