import { useInfiniteQuery } from "@tanstack/vue-query";
import type { MaybeRef } from "vue";
import { computed, toValue } from "vue";
import { getNextPage, getPreviousPage } from "~/common/utils/pagination";
import { client } from "../client";
import { rentKeys } from "./rents.keys";

export const getProductRents = async (params: {
  productId: number;
  page: number;
  limit: number;
}) => {
  const { data, error } = await client.GET(
    "/api/v1/rents/products/{productId}",
    {
      params: {
        path: { productId: params.productId },
        query: {
          page: params.page,
          limit: params.limit,
        },
      },
    }
  );

  if (error || !data) {
    throw new Error("Failed to fetch product rents");
  }
  return data;
};

export const useInfiniteProductRentsQuery = (params: {
  productId: MaybeRef<number>;
  limit?: number;
}) => {
  return useInfiniteQuery({
    queryKey: computed(() => rentKeys.products(toValue(params.productId))),
    queryFn: ({ pageParam }) =>
      getProductRents({
        productId: toValue(params.productId),
        page: pageParam,
        limit: params.limit || 5,
      }),
    getNextPageParam: getNextPage,
    getPreviousPageParam: getPreviousPage,
    initialPageParam: 1,
  });
};
