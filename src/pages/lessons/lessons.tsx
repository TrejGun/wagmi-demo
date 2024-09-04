import { FC, SyntheticEvent, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import { Lesson1 } from "./lesson1";
import { Lesson3 } from "./lesson3";
import { Lesson2 } from "./lesson2";
import { Lesson4 } from "./lesson4";
import { Lesson5 } from "./lesson5";
import { Lesson6 } from "./lesson6";

export const Lessons: FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", minHeight: "100%", pt: 11 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Connect MetaMask" />
        <Tab label="Switch network" />
        <Tab label="Deploy contract" />
        <Tab label="Get balance" />
        <Tab label="Mint tokens" />
        <Tab label="Transfer tokens" />
      </Tabs>
      <Lesson1 value={value} index={0} />
      <Lesson2 value={value} index={1} />
      <Lesson3 value={value} index={2} />
      <Lesson4 value={value} index={3} />
      <Lesson5 value={value} index={4} />
      <Lesson6 value={value} index={5} />
    </Box>
  );
}
