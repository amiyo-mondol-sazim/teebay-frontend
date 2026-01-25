import { useForm } from "vee-validate";
import { validationSchema } from "./EditProductForm.helpers";

export const useEditProductForm = () => {
  return useForm({
    validationSchema,
  });
};
