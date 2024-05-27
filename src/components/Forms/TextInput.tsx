import { FieldError } from "react-hook-form";
import { TextField } from "@mui/material";

interface TextInputProps {
  defaultValue: string;
  label: string;
  error: FieldError;
  halfWidth?: boolean;
}

export const TextInput = ({
  defaultValue,
  label,
  error,
  halfWidth,
  ...props
}: TextInputProps): JSX.Element => {
  return (
    <TextField
      {...{ label }}
      sx={{
        marginRight: { xs: "0", md: "5px", lg: "0" },
        marginLeft: { xs: "0", md: "5px", lg: "0" },
      }}
      className={`${!halfWidth ? "input-full" : "input-half"}`}
      margin="normal"
      {...{ defaultValue }}
      error={!!error}
      helperText={error?.message}
      {...props}
    />
  );
};
