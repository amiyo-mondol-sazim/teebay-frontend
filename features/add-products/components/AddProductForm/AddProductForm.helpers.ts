import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

export const addProductSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  categories: z
    .array(z.string())
    .min(1, "Add at least one category")
    .max(10, "Cannot add more than 10 categories"),
  purchasePrice: z
    .number({
      required_error: "Purchase price is required",
      invalid_type_error: "Must be a valid number",
    })
    .min(0.01, "Price must be at least $0.01")
    .max(999999.99, "Price cannot exceed $999,999.99"),
  rentPrice: z
    .number({
      required_error: "Rent price is required",
      invalid_type_error: "Must be a valid number",
    })
    .min(0.01, "Price must be at least $0.01")
    .max(999999.99, "Price cannot exceed $999,999.99"),
  rentalPeriod: z.enum(["DAY", "WEEK", "MONTH"], {
    required_error: "Select a rental period",
  }),
});

export type TAddProductInput = z.infer<typeof addProductSchema>;

export const validationSchema = toTypedSchema(addProductSchema);
