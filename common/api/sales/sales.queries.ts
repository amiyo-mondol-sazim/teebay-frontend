import { useInfiniteQuery } from "@tanstack/vue-query";
import type { MaybeRef } from "vue";
import type { TSalesListResponse } from "~/common/typedefs/query";
import { client } from "../client";
import { salesKeys } from "./sales.keys";

export const getBoughtSales = async (userId: number, params: { page: number; limit: number }): Promise<TSalesListResponse> => {
  const { data, error } = await client.GET("/api/v1/sales/bought/{userId}", {
    params: {
      path: { userId },
      query: params,
    },
  });
  if (error || !data) {
    throw new Error("Failed to fetch bought sales");
  }
  return data;
};

export const useBoughtSalesInfiniteQuery = (
  userId: MaybeRef<number>,
  params: MaybeRef<{ page: number; limit: number }>,
  options?: { enabled?: MaybeRef<boolean> }
) => {
  return useInfiniteQuery({
    queryKey: computed(() => salesKeys.bought(toValue(userId))),
    queryFn: ({ pageParam }) =>
      getBoughtSales(toValue(userId), { ...toValue(params), page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta?.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    getPreviousPageParam: (firstPage) => firstPage.meta?.hasPreviousPage ? firstPage.meta.currentPage - 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 1,
    enabled: options?.enabled,
  });
};

export const getSoldSales = async (userId: number, params: { page: number; limit: number }): Promise<TSalesListResponse> => {
  const { data, error } = await client.GET("/api/v1/sales/sold/{userId}", {
    params: {
      path: { userId },
      query: params,
    },
  });
  if (error || !data) {
    throw new Error("Failed to fetch sold sales");
  }
  return data;
};

export const useSoldSalesInfiniteQuery = (
  userId: MaybeRef<number>,
  params: MaybeRef<{ page: number; limit: number }>,
  options?: { enabled?: MaybeRef<boolean> }
) => {
  return useInfiniteQuery({
    queryKey: computed(() => salesKeys.sold(toValue(userId))),
    queryFn: ({ pageParam }) =>
      getSoldSales(toValue(userId), { ...toValue(params), page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.meta?.hasNextPage ? lastPage.meta.currentPage + 1 : undefined,
    getPreviousPageParam: (firstPage) => firstPage.meta?.hasPreviousPage ? firstPage.meta.currentPage - 1 : undefined,
    select: (data) => data.pages.flatMap((page) => page.data),
    initialPageParam: 1,
    enabled: options?.enabled,
  });
};
