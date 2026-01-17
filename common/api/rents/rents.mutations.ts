import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { productKeys } from "../products/products.keys";
import { rentKeys } from "./rents.keys";

export const useCreateRentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: {
      productId: number;
      startDate: string;
      endDate: string;
    }) => client.POST("/api/v1/rents", { body: input }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({ queryKey: rentKeys.products(variables.productId) });
      toast.success("Product rented successfully!");
    },
    onError: () => {
      toast.error("Failed to rent product. Please try again.");
    },
  });
};
