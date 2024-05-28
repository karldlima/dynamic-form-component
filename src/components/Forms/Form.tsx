import { useState } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { FormInputConfig, inputComponents } from ".";

interface FormProps<T> {
  defaultValues: T;
  inputs: FormInputConfig[];
  formSchema: ZodSchema;
}

export const Form = <T extends object>({
  defaultValues,
  inputs,
  formSchema,
}: FormProps<T>) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<T>(defaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const onSubmit = (data: T): void => {
    setSubmittedData(data);
    setFormSubmitted(true);
  };

  return (
    <div className="form-container">
      {formSubmitted ? (
        <>
          <h2>Signed up successfully!</h2>
          <div>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputs.map((input, i) => {
            const { type, label, options, halfWidth } = input ?? {};
            const Input = inputComponents[type];
            return (
              <Input
                key={i}
                error={errors[type]}
                defaultValue={defaultValues[type]}
                {...{ label }}
                {...{ options }}
                {...{ halfWidth }}
                {...register(type)}
              />
            );
          })}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ maxWidth: "fit-content", marginTop: "20px" }}
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};
