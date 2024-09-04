import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

import { Header } from "./header";

export const Layout: FC = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ pt: 11 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
