import { FC, SyntheticEvent, useState } from "react";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import { formatEther } from "viem";
import { Alert, Button, Snackbar, SnackbarCloseReason } from "@mui/material";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";
import { config } from "../../components/wagmi.config";
import { abi } from "../../contracts/ERC20Ownable.json";

export const Lesson4: FC<ITabPanelProps> = props => {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState(0n);

  const handleClose = (_event?: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleClick = async () => {
    const { contractAddress } = JSON.parse(localStorage.getItem("token") || "{}");

    const result = await readContract(config, {
      abi,
      address: contractAddress,
      functionName: "balanceOf",
      args: [address],
    });

    setBalance(BigInt(String(result)));
    setOpen(true);
  };

  return (
    <TabPanel {...props}>
      <Button variant="outlined" onClick={handleClick}>
        Get balance
      </Button>

      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: "100%" }}>
          Balance: Ξ {formatEther(balance)}
        </Alert>
      </Snackbar>
    </TabPanel>
  );
};
