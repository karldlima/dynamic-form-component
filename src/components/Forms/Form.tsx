import { useState } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";

import { inputComponents } from ".";

interface FormProps<T, V> {
  defaultValues: T;
  inputs: V;
  formSchema: ZodTypeAny;
}

export const Form = <T extends object, V extends any[]>({
  defaultValues,
  inputs,
  formSchema,
}: FormProps<T, V>) => {
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
          <div className="results-container">
            <span>{JSON.stringify(submittedData, null, 2)}</span>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputs.map((input, i) => {
            const { type, label, options, halfWidth } = input ?? {};
            const Input: () => JSX.Element = inputComponents[type];
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
