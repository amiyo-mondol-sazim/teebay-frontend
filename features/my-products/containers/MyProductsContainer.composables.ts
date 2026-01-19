import { useIntersectionObserver } from "@vueuse/core";
import type { MaybeRef } from "vue";

export const useMyProductsState = () => {
  const { data: user, isLoading: isUserLoading } = useUserQuery();

  const statusFilter = ref<EProductStatusFilter>(EProductStatusFilter.ALL);

  const ownerId = computed(() => user.value?.id);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useOwnerProductsInfiniteQuery(
    computed(() => ownerId.value ?? 0),
    { page: 1, limit: 12 },
  );

  return {
    user,
    isUserLoading,
    statusFilter,
    ownerId,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
};

export const useFilteredProducts = (
  data: MaybeRef<TProductResponse[] | undefined>,
  statusFilter: MaybeRef<EProductStatusFilter>,
) => {
  const products = computed(() => {
    const allProducts = toValue(data) || [];
    if (toValue(statusFilter) === EProductStatusFilter.ALL) {
      return allProducts;
    }
    return allProducts.filter((p) => p.status === toValue(statusFilter));
  });

  const allProducts = computed(() => toValue(data) || []);

  return { products, allProducts };
};

export const useInfiniteScroll = (
  loadMoreTrigger: MaybeRef<HTMLElement | null | undefined>,
  hasNextPage: MaybeRef<boolean>,
  isFetchingNextPage: MaybeRef<boolean>,
  fetchNextPage: () => void,
) => {
  useIntersectionObserver(loadMoreTrigger, ([entry]) => {
    const hasData = toValue(hasNextPage) && !toValue(isFetchingNextPage);
    if (entry?.isIntersecting && hasData) {
      fetchNextPage();
    }
  });
};
