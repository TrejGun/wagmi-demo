import { FC, useEffect } from "react";
import { waitForTransactionReceipt, watchContractEvent, writeContract } from "@wagmi/core";
import { Hash } from "viem";
import { Button } from "@mui/material";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";
import { config } from "../../components/wagmi.config";
import { abi } from "../../utils/Kamasutra.json";

export const Lesson6: FC<ITabPanelProps> = props => {
  const handleClick = async () => {
    const { contractAddress } = JSON.parse(localStorage.getItem("token") || "{}");
    console.log(contractAddress);

    const txHash = await writeContract(config, {
      abi,
      address: contractAddress,
      functionName: "transfer",
      args: ["0xFE3B557E8Fb62b89F4916B721be55cEb828dBd73", 10n * 1_000_000_000_000_000_000n],
    });

    console.log({ txHash });

    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash: txHash as Hash,
    });

    console.log({ transactionReceipt });
  };

  useEffect(() => {
    const { contractAddress } = JSON.parse(localStorage.getItem("token") || "{}");
    console.log(contractAddress);

    return watchContractEvent(config, {
      address: contractAddress,
      abi,
      eventName: "Transfer",
      onLogs(logs) {
        console.log("New logs!", logs);
      },
    });
  }, []);

  return (
    <TabPanel {...props}>
      <Button
        variant="outlined"
        onClick={handleClick}
      >
        Transfer
      </Button>
    </TabPanel>
  );
};
