import { useMutation } from "@tanstack/vue-query";
import { client } from "../client";

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
