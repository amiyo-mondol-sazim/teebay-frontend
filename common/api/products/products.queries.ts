import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import { computed } from "vue";
import type { TGetProductsQuery } from "~/common/typedefs/query";
import { getNextPage, getPreviousPage } from "~/common/utils/pagination";
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
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
