import { useForm } from "vee-validate";
import { useCreateProductMutation } from "~/common/api/products/products.mutations";
import { validationSchema, type TAddProductInput } from "./AddProductForm.helpers";

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

export const useAddProduct = () => {
  const { mutate, isPending } = useCreateProductMutation();

  const addProduct = (values: TAddProductInput) => {
    mutate(values);
  };

  return {
    addProduct,
    isPending,
  };
};
