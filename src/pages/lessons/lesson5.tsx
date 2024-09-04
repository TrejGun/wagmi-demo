import { FC } from "react";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { Hash } from "viem";
import { Button } from "@mui/material";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";
import { config } from "../../components/wagmi.config";
import { abi } from "../../utils/Kamasutra.json";

export const Lesson5: FC<ITabPanelProps> = props => {
  const { address } = useAccount();

  const handleClick = async () => {
    const { contractAddress } = JSON.parse(localStorage.getItem("token") || "{}");
    console.log(contractAddress);

    const txHash = await writeContract(config, {
      abi,
      address: contractAddress,
      functionName: "mint",
      args: [address, 1_000_000n * 1_000_000_000_000_000_000n],
    });

    console.log({ txHash });

    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash: txHash as Hash,
    });

    console.log({ transactionReceipt });
  };

  return (
    <TabPanel {...props}>
      <Button
        variant="outlined"
        onClick={handleClick}
      >
        Mint tokens
      </Button>
    </TabPanel>
  );
};
