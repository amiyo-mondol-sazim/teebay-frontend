type PaginatedResponse = {
  meta: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    currentPage: number;
  };
};

export function getNextPage<T extends PaginatedResponse>(lastPage: T) {
  return lastPage?.meta?.hasNextPage
    ? lastPage.meta.currentPage + 1
    : undefined;
}

export function getPreviousPage<T extends PaginatedResponse>(firstPage: T) {
  return firstPage?.meta?.hasPreviousPage
    ? firstPage.meta.currentPage - 1
    : undefined;
}
