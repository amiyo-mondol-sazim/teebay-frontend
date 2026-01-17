import type { TGetProductsResponse } from "~/common/typedefs/query";

export function getNextPage(lastPage: TGetProductsResponse) {
  return lastPage?.meta?.hasNextPage
    ? lastPage.meta.currentPage + 1
    : undefined;
}

export function getPreviousPage(firstPage: TGetProductsResponse) {
  return firstPage?.meta?.hasPreviousPage
    ? firstPage.meta.currentPage - 1
    : undefined;
}
