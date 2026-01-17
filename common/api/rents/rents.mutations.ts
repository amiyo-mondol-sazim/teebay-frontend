import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { productKeys } from "../products/products.keys";
import { rentKeys } from "./rents.keys";

export const rentProduct = async (input: {
  productId: number;
  startDate: string;
  endDate: string;
}) => {
  const { data, error } = await client.POST("/api/v1/rents", { body: input });
  if (error || !data) {
    throw new Error(error?.message || "Failed to rent product");
  }
  return data;
};

export const useCreateRentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rentProduct,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: rentKeys.products(variables.productId),
      });
      toast.success("Product rented successfully!");
    },
    onError: () => {
      toast.error("Failed to rent product. Please try again.");
    },
  });
};
