import { FC } from "react";
import { AppBar, Toolbar, Link, useTheme } from "@mui/material";


export const Header: FC = () => {
  const theme = useTheme();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link href={"http://gemunion.io"} sx={{ color: theme.palette.common.white }}>
          Gemunion.io
        </Link>
      </Toolbar>
    </AppBar>
  );
};
