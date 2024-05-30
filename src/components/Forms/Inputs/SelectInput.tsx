/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Theme,
} from "@mui/material";

import { formInputCss } from ".";

interface SelectInputProps {
  options: string[];
  defaultValue: string;
  label: string;
  error: FieldError;
  halfWidth?: boolean;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    { options, defaultValue, label, error, halfWidth, ...props },
    ref
  ): JSX.Element => (
    <FormControl
      margin="normal"
      error={!!error}
      css={(theme) => [
        formInputCss.self,
        halfWidth && formInputCss.halfWidth(theme as Theme),
      ]}
    >
      <InputLabel>{label}</InputLabel>
      <Select inputRef={ref} {...props} {...{ label }} {...{ defaultValue }}>
        {options?.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  )
);
