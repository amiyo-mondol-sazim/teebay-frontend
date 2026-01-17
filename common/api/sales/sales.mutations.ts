import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { productKeys } from "../products/products.keys";

const buyProduct = async (productId: number) => {
  const { data, error } = await client.POST("/api/v1/sales/buy", {
    body: { productId },
  });
  if (error || !data) {
    throw new Error(error?.message || "Failed to buy product");
  }
  return data;
};

export const useBuyProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: buyProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product purchased successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });
};
