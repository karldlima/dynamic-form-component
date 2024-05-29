import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { TextField } from "@mui/material";

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
      className={`${!halfWidth ? "input-full" : "input-half"}`}
      margin="normal"
      {...{ defaultValue }}
      error={!!error}
      helperText={error?.message}
      {...props}
    />
  )
);
