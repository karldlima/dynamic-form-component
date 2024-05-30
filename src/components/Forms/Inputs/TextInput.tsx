/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { TextField, Theme } from "@mui/material";

import { formInputCss } from ".";

interface TextInputProps {
  defaultValue: string;
  label: string;
  error: FieldError;
  halfWidth?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ defaultValue, label, error, halfWidth, ...props }, ref): JSX.Element => (
    <TextField
      inputRef={ref}
      {...{ label }}
      css={(theme) => [
        formInputCss.self,
        halfWidth && formInputCss.halfWidth(theme as Theme),
      ]}
      margin="normal"
      {...{ defaultValue }}
      error={!!error}
      helperText={error?.message}
      {...props}
    />
  )
);
