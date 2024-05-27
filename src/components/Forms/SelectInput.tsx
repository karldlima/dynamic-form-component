import { FieldError } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface SelectInputProps {
  options: string[];
  defaultValue: string;
  label: string;
  error: FieldError;
}

export const SelectInput = ({
  options,
  defaultValue,
  label,
  error,
  ...props
}: SelectInputProps): JSX.Element => {
  return (
    <FormControl margin="normal" error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select
        {...{ label }}
        {...props}
        {...{ defaultValue }}
        sx={{ minWidth: 300 }}
      >
        {options?.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
