import { FC, SyntheticEvent, useState } from "react";
import { deployContract, waitForTransactionReceipt } from "@wagmi/core";
import { Hash, parseEventLogs } from "viem";
import { Alert, Button, Snackbar, SnackbarCloseReason } from "@mui/material";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";
import { config } from "../../components/wagmi.config";
import { abi, bytecode } from "../../contracts/ERC20Ownable.json";

export const Lesson3: FC<ITabPanelProps> = props => {
  const [open, setOpen] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleClose = (
    _event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = async () => {
    const txHash = await deployContract(config, {
      abi,
      bytecode: bytecode as Hash,
      args: ["Space Credits", "SP"],
    });

    setTxHash(txHash);
    setOpen(true);

    const transactionReceipt = await waitForTransactionReceipt(config, {
      hash: txHash,
    });

    console.log({ transactionReceipt });

    const logs = parseEventLogs({
      abi: abi,
      logs: transactionReceipt.logs,
    });

    console.log({ logs });

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

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          TransactionHash: {txHash}
        </Alert>
      </Snackbar>
    </TabPanel>
  );
};
