import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { productKeys } from "../products/products.keys";

const buyProduct = (productId: number) => {
  return client.POST("/api/v1/sales/buy", {
    body: { productId },
  });
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
