import { z } from "zod";

import { FormInputConfig } from "../components/Forms";
import { australianStates } from "../data";

export const formInputs: FormInputConfig[] = [
  {
    type: "name",
    label: "Name *",
    validation: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Name must not be longer than 30 characters.",
      }),
    defaultValue: "",
  },
  {
    type: "email",
    label: "Email *",
    validation: z.string().email(),
    defaultValue: "",
  },
  {
    type: "phone",
    label: "Phone *",
    validation: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(10),
    defaultValue: "",
  },
  {
    type: "address",
    label: "Address",
    validation: z
      .string()
      .min(6, {
        message: "Address must be at least 6 characters.",
      })
      .max(80, {
        message: "Address must not be longer than 80 characters.",
      })
      .optional(),
    defaultValue: "",
  },
  {
    type: "postcode",
    label: "Postcode *",
    validation: z
      .string()
      .regex(/^\d{4}$/, "Postcode must be a 4-digit number")
      .refine((val) => parseInt(val, 10) >= 200 && parseInt(val, 10) <= 9999, {
        message: "Postcode must be between 0200 and 9999",
      }),
    defaultValue: "",
  },
  {
    type: "state",
    label: "State *",
    validation: z.string().min(1, "State is required"),
    defaultValue: "",
    options: australianStates,
  },
  {
    type: "tnc",
    label: "I agree to the Terms & Conditions *",
    validation: z.boolean().refine((val) => val === true, {
      message: "The terms and conditions must be checked",
    }),
    defaultValue: false,
  },
];
