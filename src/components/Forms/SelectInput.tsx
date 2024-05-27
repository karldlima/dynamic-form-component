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
  halfWidth?: boolean;
}

export const SelectInput = ({
  options,
  defaultValue,
  label,
  error,
  halfWidth,
  ...props
}: SelectInputProps): JSX.Element => {
  return (
    <FormControl
      margin="normal"
      error={!!error}
      sx={{
        marginRight: { xs: "0", md: "5px", lg: "0" },
        marginLeft: { xs: "0", md: "5px", lg: "0" },
      }}
      className={`${!halfWidth ? "input-full" : "input-half"}`}
    >
      <InputLabel>{label}</InputLabel>
      <Select {...props} {...{ label }} {...{ defaultValue }}>
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
