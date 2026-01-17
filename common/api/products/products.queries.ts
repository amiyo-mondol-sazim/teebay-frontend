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
