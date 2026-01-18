import { useInfiniteQuery } from "@tanstack/vue-query";
import type { MaybeRef } from "vue";
import type { TRentsListResponse } from "~/common/typedefs/query";
import { client } from "../client";
import { rentKeys } from "./rents.keys";
import { toValue, computed } from "vue";

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

export const getBorrowsByUser = async (
  userId: number,
  params: { page: number; limit: number }
): Promise<TRentsListResponse> => {
  const { data, error } = await client.GET("/api/v1/rents/borrows/{userId}", {
    params: {
      path: { userId },
      query: params,
    },
  });

  if (error || !data) {
    throw new Error("Failed to fetch borrows");
  }
  return data;
};

export const useBorrowsRentsInfiniteQuery = (
  userId: MaybeRef<number>,
  params: MaybeRef<{ page: number; limit: number }>,
  options?: { enabled?: MaybeRef<boolean> }
) => {
  return useInfiniteQuery({
    queryKey: computed(() => rentKeys.borrows(toValue(userId))),
    queryFn: ({ pageParam }) =>
      getBorrowsByUser(toValue(userId), { ...toValue(params), page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.meta?.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.meta?.hasPreviousPage ? firstPage.meta.currentPage - 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 1,
    enabled: options?.enabled,
  });
};

export const getLentsByUser = async (
  userId: number,
  params: { page: number; limit: number }
): Promise<TRentsListResponse> => {
  const { data, error } = await client.GET("/api/v1/rents/lents/{userId}", {
    params: {
      path: { userId },
      query: params,
    },
  });

  if (error || !data) {
    throw new Error("Failed to fetch lents");
  }
  return data;
};

export const useLentsRentsInfiniteQuery = (
  userId: MaybeRef<number>,
  params: MaybeRef<{ page: number; limit: number }>,
  options?: { enabled?: MaybeRef<boolean> }
) => {
  return useInfiniteQuery({
    queryKey: computed(() => rentKeys.lents(toValue(userId))),
    queryFn: ({ pageParam }) =>
      getLentsByUser(toValue(userId), { ...toValue(params), page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.meta?.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.meta?.hasPreviousPage ? firstPage.meta.currentPage - 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 1,
    enabled: options?.enabled,
  });
};
