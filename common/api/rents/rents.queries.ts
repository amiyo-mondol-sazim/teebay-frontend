import { useInfiniteQuery } from "@tanstack/vue-query";
import type { TRentsListResponse } from "~/common/typedefs/query";
import { client } from "../client";
import { rentKeys } from "./rents.keys";

export const getProductRents = async (params: {
  productId: number;
  page: number;
  limit: number;
}): Promise<TRentsListResponse> => {
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
    },
  );

  if (error || !data) {
    throw new Error("Failed to fetch product rents");
  }
  return data;
};

export const useInfiniteProductRentsQuery = (
  productId: number,
  limit: number = 5,
) => {
  return useInfiniteQuery({
    queryKey: rentKeys.products(toValue(productId)),
    queryFn: ({ pageParam }) =>
      getProductRents({
        productId: productId,
        page: pageParam,
        limit: limit || 5,
      }),
    getNextPageParam: getNextPage,
    getPreviousPageParam: getPreviousPage,
    initialPageParam: 1,
  });
};
