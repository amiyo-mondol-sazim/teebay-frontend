import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { productKeys } from "../products/products.keys";

export const useBuyProductMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: number) =>
      client.POST("/api/v1/sales/buy", { body: { productId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product purchased successfully!");
    },
    onError: () => {
      toast.error("Failed to purchase product. Please try again.");
    },
  });
};
