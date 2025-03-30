import { FC, PropsWithChildren } from "react";
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
  key: "mui",
  prepend: true,
});

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

export const ThemeProvider: FC<PropsWithChildren> = props => {
  const { children } = props;
  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
};
