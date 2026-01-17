import { useForm } from "vee-validate";
import { validationSchema } from "./AddProductForm.helpers";

export const useAddProductForm = () => {
  return useForm({
    validationSchema,
    initialValues: {
      title: "",
      description: "",
      categories: [] as string[],
      purchasePrice: 0,
      rentPrice: 0,
      rentalPeriod: "DAY" as const,
    },
  });
};
