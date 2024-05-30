/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Theme,
} from "@mui/material";

import { formInputCss } from ".";

interface CheckboxInputProps {
  defaultValue: boolean;
  label: string;
  error: FieldError;
  halfWidth?: boolean;
}

export const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ defaultValue, label, error, halfWidth, ...props }, ref): JSX.Element => (
    <FormControl
      error={!!error}
      component="fieldset"
      css={(theme) => [
        formInputCss.self,
        halfWidth && formInputCss.halfWidth(theme as Theme),
      ]}
      variant="standard"
    >
      <FormControlLabel
        control={
          <Checkbox {...props} inputRef={ref} defaultChecked={defaultValue} />
        }
        {...{ label }}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  )
);
