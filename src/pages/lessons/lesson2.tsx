import { FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useDeployContract } from "wagmi";
import { abi, bytecode } from "./ERC20OB.json";

import { ITabPanelProps, TabPanel } from "../../components/tab-panel";

export const Lesson2: FC<ITabPanelProps> = props => {
  const queryClient = useQueryClient();
  const { deployContract } = useDeployContract();


  return (
    <TabPanel {...props}>
      <button
        onClick={() =>
          // @ts-ignore
          // deployContract({ abi, bytecode })
          console.log(queryClient)
        }
      >
        Deploy Contract
      </button>
    </TabPanel>
  );
};
