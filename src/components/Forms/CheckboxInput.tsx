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
}

export const CheckboxInput = ({
  defaultValue,
  label,
  error,
  ...props
}: CheckboxInputProps): JSX.Element => {
  return (
    <FormControl
      error={!!error}
      component="fieldset"
      sx={{ width: "100%" }}
      variant="standard"
    >
      <FormControlLabel
        control={<Checkbox {...props} defaultChecked={defaultValue} />}
        {...{ label }}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
