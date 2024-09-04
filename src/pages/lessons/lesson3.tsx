import { FC } from "react";
import { deployContract, waitForTransactionReceipt } from "@wagmi/core";
import { Abi, Hash } from "viem";
import { Button } from "@mui/material";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";
import { config } from "../../components/wagmi.config";
import { abi, bytecode } from "../../utils/Kamasutra.json";

export const Lesson3: FC<ITabPanelProps> = props => {
  const handleClick = async () => {
    const txHash = await deployContract(config, {
      abi: abi as Abi,
      bytecode: bytecode as Hash,
      args: ["IT-Kamasutra", "KMS"],
    });

    console.log({ txHash });

    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash: txHash as Hash,
    });

    console.log({ transactionReceipt });

    localStorage.setItem("token", JSON.stringify({ contractAddress: transactionReceipt.contractAddress }));
  };

  return (
    <TabPanel {...props}>
      <Button
        variant="outlined"
        onClick={handleClick}
      >
        Deploy Contract
      </Button>
    </TabPanel>
  );
};
