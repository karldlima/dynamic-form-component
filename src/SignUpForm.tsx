import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { australianStates } from "./data";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  email: z.string().email(),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(10),
  address: z
    .string()
    .min(6, {
      message: "Address must be at least 6 characters.",
    })
    .max(80, {
      message: "Address must not be longer than 80 characters.",
    })
    .optional(),
  postcode: z
    .string()
    .regex(/^\d{4}$/, "Postcode must be a 4-digit number")
    .refine((val) => parseInt(val, 10) >= 200 && parseInt(val, 10) <= 9999, {
      message: "Postcode must be between 0200 and 9999",
    }),
  state: z.string().min(1, "State is required"),
  tnc: z.boolean().refine((val) => val === true, {
    message: "The terms and conditions must be checked",
  }),
});

type SignUpFormValues = z.infer<typeof formSchema>;

/*
  This is a functional component that renders a sign up form
  with a hardcoded schema and default values, I've kept this
  component in to show the working example. The reusable form
  component is FormWrapper.tsx
*/
const defaultValues: Partial<SignUpFormValues> = {
  name: "",
  email: "",
  phone: "",
  address: "",
  postcode: "",
  state: "",
  tnc: false,
};

export const SignUpForm = (): JSX.Element => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(defaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: SignUpFormValues): void => {
    setSubmittedData(data);
    setFormSubmitted(true);
  };

  return (
    <div>
      {formSubmitted ? (
        <>
          <h2>Signed up successfully!</h2>
          <div>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name *"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.name}
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email *"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.email}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Phone *"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.phone}
            {...register("phone")}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.address}
            {...register("address")}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <div>
            <TextField
              label="Postcode *"
              margin="normal"
              defaultValue={defaultValues.postcode}
              {...register("postcode")}
              error={!!errors.postcode}
              helperText={errors.postcode?.message}
              sx={{ minWidth: 300 }}
            />
            <FormControl margin="normal" error={!!errors.state}>
              <InputLabel>State *</InputLabel>
              <Select
                label="State *"
                {...register("state")}
                defaultValue={defaultValues.state}
                sx={{ minWidth: 300 }}
              >
                {australianStates.map((state, index) => (
                  <MenuItem key={index} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.state?.message}</FormHelperText>
            </FormControl>
          </div>
          <FormControl
            error={!!errors.tnc}
            component="fieldset"
            sx={{ width: "100%" }}
            variant="standard"
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...register("tnc")}
                  defaultChecked={defaultValues.tnc}
                />
              }
              label="I agree to the Terms & Conditions *"
            />
            <FormHelperText>{errors.tnc?.message}</FormHelperText>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ maxWidth: "fit-content" }}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};
