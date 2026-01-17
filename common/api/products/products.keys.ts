import type { TGetProductsQuery } from "~/common/typedefs/query";

export const productKeys = {
  all: ["products"],
  list: () => [...productKeys.all, "list"],
  lists: (params: TGetProductsQuery) => [...productKeys.all, "list", params],
  detail: (id: number) => [...productKeys.all, "detail", id],
  owner: (ownerId: number, params: TGetProductsQuery) => [...productKeys.all, "owner", ownerId, params],
  create: () => [...productKeys.all, "create"],
};
