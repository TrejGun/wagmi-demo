import { FC, SyntheticEvent, useEffect, useState } from "react";
import { waitForTransactionReceipt, watchContractEvent, writeContract } from "@wagmi/core";
import { parseEther, parseEventLogs } from "viem";
import { Alert, Button, Snackbar, SnackbarCloseReason } from "@mui/material";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";
import { config } from "../../components/wagmi.config";
import { abi } from "../../contracts/ERC20Ownable.json";

export const Lesson6: FC<ITabPanelProps> = props => {
  const [open, setOpen] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleClose = (_event?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = async () => {
    const { contractAddress } = JSON.parse(localStorage.getItem("token") || "{}");

    const txHash = await writeContract(config, {
      abi,
      address: contractAddress,
      functionName: "transfer",
      args: ["0x627306090abaB3A6e1400e9345bC60c78a8BEf57", 10n * parseEther("1")],
    });

    setTxHash(txHash);
    setOpen(true);

    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash: txHash,
    });

    console.info({ transactionReceipt });

    const logs = parseEventLogs({
      abi: abi,
      logs: transactionReceipt.logs,
    });

    console.info({ logs });
  };

  useEffect(() => {
    const { contractAddress } = JSON.parse(localStorage.getItem("token") || "{}");

    return watchContractEvent(config, {
      address: contractAddress,
      abi,
      eventName: "Transfer",
      onLogs(logs) {
        console.info("New logs!", logs);
      },
    });
  }, []);

  return (
    <TabPanel {...props}>
      <Button variant="outlined" onClick={handleClick}>
        Transfer
      </Button>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          TransactionHash: {txHash}
        </Alert>
      </Snackbar>
    </TabPanel>
  );
};
