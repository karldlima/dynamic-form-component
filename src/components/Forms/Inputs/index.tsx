import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export const formInputCss = {
  self: css({
    boxSizing: "border-box",
    flex: "1 1 100%",
  }),
  halfWidth: (theme: Theme) =>
    css({
      [theme.breakpoints.up("md")]: {
        flex: "1 1 calc(50% - 5px)",
      },
    }),
};

export * from "./TextInput";
export * from "./SelectInput";
export * from "./CheckboxInput";
