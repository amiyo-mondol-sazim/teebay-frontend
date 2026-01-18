import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import type { TGetProductsQuery } from "~/common/typedefs/query";
import { STALE_TIME } from "~/common/constants/api.constants";
import { client } from "../client";
import { productKeys } from "./products.keys";

export const getProducts = async (params: TGetProductsQuery) => {
  const { data, error } = await client.GET("/api/v1/products", {
    params: {
      query: params,
    },
  });
  if (error || !data) {
    throw new Error("Failed to fetch products");
  }
  return data;
};

export const useProductsQuery = (params: Ref<TGetProductsQuery>) => {
  return useQuery({
    queryKey: computed(() => productKeys.lists(params.value)),
    queryFn: () => getProducts(params.value),
  });
};

export const useProductsInfiniteQuery = (
  params: MaybeRef<TGetProductsQuery>
) => {
  return useInfiniteQuery({
    queryKey: computed(() => productKeys.lists(toValue(params))),
    queryFn: ({ pageParam }) =>
      getProducts({ ...toValue(params), page: pageParam }),
    getNextPageParam: getNextPage,
    getPreviousPageParam: getPreviousPage,
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 1,
  });
};

export const getProductById = async (id: number) => {
  const { data, error } = await client.GET("/api/v1/products/{id}", {
    params: { path: { id } },
  });
  if (error || !data) {
    throw new Error("Failed to fetch product");
  }
  return data;
};

export const useProductDetailQuery = (id: Ref<number>) => {
  return useQuery({
    queryKey: computed(() => productKeys.detail(id.value)),
    queryFn: () => getProductById(id.value),
    enabled: computed(() => !!id.value),
    staleTime: STALE_TIME.MEDIUM,
  });
};

export const getProductsByOwner = async (ownerId: number, params: { page: number; limit: number }) => {
  const { data, error } = await client.GET("/api/v1/products/owner/{ownerId}", {
    params: {
      path: { ownerId },
      query: params,
    },
  });
  if (error || !data) {
    throw new Error("Failed to fetch owner products");
  }
  return data;
};

export const useOwnerProductsInfiniteQuery = (
  ownerId: MaybeRef<number>,
  params: MaybeRef<{ page: number; limit: number }>
) => {
  return useInfiniteQuery({
    queryKey: computed(() => productKeys.owner(toValue(ownerId), toValue(params))),
    queryFn: ({ pageParam }) =>
      getProductsByOwner(toValue(ownerId), { ...toValue(params), page: pageParam }),
    getNextPageParam: getNextPage,
    getPreviousPageParam: getPreviousPage,
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 1,
    enabled: computed(() => !!toValue(ownerId)),
  });
};
