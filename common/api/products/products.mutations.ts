import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { productKeys } from "./products.keys";
import type { TCreateProductInput } from "~/common/typedefs/products";

export const useIncrementViewsMutation = () => {
  return useMutation({
    mutationFn: (productId: number) =>
      client.PATCH("/api/v1/products/{id}/views", {
        params: { path: { id: productId } },
      }),
    onError: (error) => {
      console.error("Failed to increment views:", error);
    },
  });
};

const createProduct = async (input: TCreateProductInput) => {
  const { data, error } = await client.POST("/api/v1/products", {
    body: input,
  });
  if (error || !data) {
    throw new Error(error?.message || "Failed to create product");
  }
  return data;
};

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product created successfully!");
      navigateTo("/my-products");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to create product. Please try again.");
    },
  });
};
