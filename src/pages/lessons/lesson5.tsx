import { FC, SyntheticEvent, useState } from "react";
import { useAccount } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { parseEther, parseEventLogs } from "viem";
import { Alert, Button, Snackbar, SnackbarCloseReason } from "@mui/material";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";
import { config } from "../../components/wagmi.config";
import { abi } from "../../contracts/ERC20Ownable.json";

export const Lesson5: FC<ITabPanelProps> = props => {
  const { address } = useAccount();
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
      functionName: "mint",
      args: [address, 1_000_000n * parseEther("1")],
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

  return (
    <TabPanel {...props}>
      <Button variant="outlined" onClick={handleClick}>
        Mint tokens
      </Button>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          TransactionHash: {txHash}
        </Alert>
      </Snackbar>
    </TabPanel>
  );
};
