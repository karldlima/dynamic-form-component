import React from "react";
import ReactDOM from "react-dom/client";
import { Theme, ThemeProvider } from "@mui/material/styles";
import { Global } from "@emotion/react";

import App from "./App";

import { global, theme } from "./design-system/css/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={(theme) => global(theme as Theme)} />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
