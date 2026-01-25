import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { productKeys } from "./products.keys";
import type { TCreateProductInput, TUpdateProductInput } from "~/common/typedefs/products";

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

const deleteProduct = async (productId: number): Promise<TProductResponse> => {
  const { data, error } = await client.DELETE("/api/v1/products/{id}", {
    params: { path: { id: productId } },
  });

  if (error || !data) {
    throw new Error(error?.message || "Failed to delete product");
  }

  return data;
};

export const useDeleteProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product deleted successfully!");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to delete product. Please try again.");
    },
  });
};

const editProduct = async (
  id: number,
  data: TUpdateProductInput
): Promise<TProductResponse> => {
  const { data: response, error } = await client.PATCH("/api/v1/products/{id}", {
    params: { path: { id } },
    body: data,
  });

  if (error || !response) {
    throw new Error(error?.message || "Failed to update product");
  }

  return response;
};

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: TUpdateProductInput }) =>
      editProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id)
      });
      queryClient.invalidateQueries({ queryKey: productKeys.all });

      toast.success("Product updated successfully!");
      navigateTo("/my-products");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to update product. Please try again.");
    },
  });
};
