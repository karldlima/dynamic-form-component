import { z, ZodTypeAny } from "zod";

import { CheckboxInput, Form, SelectInput, TextInput } from ".";

export const inputComponents: { [key: string]: () => JSX.Element } = {
  name: TextInput,
  email: TextInput,
  phone: TextInput,
  address: TextInput,
  postcode: TextInput,
  state: SelectInput,
  tnc: CheckboxInput,
};

export type InputComponent = keyof typeof inputComponents;

type DefaultValue<T extends InputComponent> = T extends "tnc"
  ? boolean
  : string;

export interface FormInputConfig<T extends InputComponent = InputComponent> {
  type: T;
  label: string;
  validation: ZodTypeAny;
  defaultValue: DefaultValue<T>;
  options?: string[];
  halfWidth?: boolean;
}

interface FormWrapperProps {
  inputs: FormInputConfig[];
}

export const FormWrapper = ({ inputs }: FormWrapperProps): JSX.Element => {
  const schemaObject = inputs.reduce((acc, input) => {
    acc[input.type] = input.validation;
    return acc;
  }, {} as { [key: string]: ZodTypeAny });

  const formSchema = z.object(schemaObject);
  type FormValues = z.infer<typeof formSchema>;

  const defaultValues: Partial<FormValues> = {};
  for (const { type, defaultValue } of inputs) {
    defaultValues[type] = defaultValue;
  }

  return <Form {...{ defaultValues, inputs, formSchema }} />;
};
