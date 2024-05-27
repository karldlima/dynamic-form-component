import { useState, Component } from "react";
import { DefaultValues, useForm } from "react-hook-form";
import { ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    watch,
    formState: { errors, touchedFields },
  } = useForm<T>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const onSubmit = (data: T): void => {
    setSubmittedData(data);
    setFormSubmitted(true);
  };

  console.log("inputs: ", inputs);

  return (
    <div>
      {formSubmitted ? (
        <div>
          <h2>Signed up successfully!</h2>
          <span>{JSON.stringify(submittedData, null, 2)}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {inputs.map(({ type, ...rest }, i) => {
            const Input: () => JSX.Element = inputComponents[type];
            return <Input key={i} {...rest} />;
          })}
        </form>
      )}
    </div>
  );
};
