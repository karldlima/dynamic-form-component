import { z, ZodTypeAny } from "zod";

import { Form } from ".";
import { CheckboxInput, SelectInput, TextInput } from "./Inputs";

export const inputComponents = {
  name: TextInput,
  email: TextInput,
  phone: TextInput,
  address: TextInput,
  postcode: TextInput,
  state: SelectInput,
  tnc: CheckboxInput,
};

export type InputComponent = keyof typeof inputComponents;

type DefaultValue<T> = T extends "tnc" ? boolean : string;

export interface FormInputConfig {
  type: InputComponent;
  label: string;
  validation: ZodTypeAny;
  defaultValue: DefaultValue<InputComponent>;
  options?: string[];
  halfWidth?: boolean;
}

type SchemaObject = {
  [key in InputComponent]: ZodTypeAny;
};

interface FormWrapperProps {
  inputs: FormInputConfig[];
}

export const FormWrapper = ({ inputs }: FormWrapperProps): JSX.Element => {
  const schemaObject: SchemaObject = inputs.reduce(
    (acc, { type, validation }) => {
      acc[type] = validation;
      return acc;
    },
    {} as SchemaObject
  );

  const formSchema = z.object(schemaObject);
  type FormValues = z.infer<typeof formSchema>;

  const defaultValues: Partial<FormValues> = {};
  for (const { type, defaultValue } of inputs) {
    defaultValues[type] = defaultValue;
  }

  return <Form {...{ defaultValues, inputs, formSchema }} />;
};
