import { FieldError } from "react-hook-form";
import { TextField } from "@mui/material";

interface TextInputProps {
  defaultValue: string;
  label: string;
  error: FieldError;
}

export const TextInput = ({
  defaultValue,
  label,
  error,
  ...props
}: TextInputProps): JSX.Element => {
  return (
    <TextField
      {...{ label }}
      fullWidth
      margin="normal"
      {...{ defaultValue }}
      error={!!error}
      helperText={error?.message}
      {...props}
    />
  );
};
