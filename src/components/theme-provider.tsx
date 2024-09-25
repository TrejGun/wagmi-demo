import { FC, PropsWithChildren } from "react";
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { jssPreset, StylesProvider } from "@mui/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { create } from "jss";

const cache = createCache({
  key: "mui",
  prepend: true,
  stylisPlugins: [prefixer],
});

const jss = create({
  plugins: [...jssPreset().plugins],
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
      <StylesProvider jss={jss}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </StyledEngineProvider>
      </StylesProvider>
    </CacheProvider>
  );
};
