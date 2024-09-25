import { FC } from "react";
import { AppBar, Toolbar, Link, useTheme } from "@mui/material";

export const Header: FC = () => {
  const theme = useTheme();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link
          href={"http://ethberry.io"}
          sx={{
            color: theme.palette.common.white,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 36,
          }}
        >
          EthBerry.io
        </Link>
      </Toolbar>
    </AppBar>
  );
};
