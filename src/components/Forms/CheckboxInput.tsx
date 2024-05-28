import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

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
      sx={{
        marginRight: { xs: "0", md: "5px", lg: "0" },
        marginLeft: { xs: "0", md: "5px", lg: "0" },
      }}
      className={`${!halfWidth ? "input-full" : "input-half"}`}
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
