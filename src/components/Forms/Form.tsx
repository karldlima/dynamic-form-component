/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Theme } from "@mui/material";
import { css } from "@emotion/react";

import { FormInputConfig, inputComponents } from ".";

const formContainerCss = {
  self: (theme: Theme) =>
    css({
      padding: "30px",
      backgroundColor: theme.palette.secondary.light,
      maxWidth: "600px",
      height: "calc(100vh - 60px)",
      [theme.breakpoints.up("md")]: {
        padding: "50px",
        height: "fit-content",
      },
    }),
  button: css({
    marginTop: "20px",
  }),
  form: css({
    display: "flex",
    flexWrap: "wrap",
    gap: "0 10px",
  }),
};

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
    <div css={(theme) => formContainerCss.self(theme as Theme)}>
      {formSubmitted ? (
        <>
          <h2>Signed up successfully!</h2>
          <div>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        </>
      ) : (
        <form css={formContainerCss.form} onSubmit={handleSubmit(onSubmit)}>
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
            css={formContainerCss.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
      )}
    </div>
  );
};
