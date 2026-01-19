import { useIntersectionObserver } from "@vueuse/core";
import type { ComputedRef, Ref } from "vue";
import { computed } from "vue";

export function useDualTabInfiniteQuery<TTab extends string, TQueries>({
  tabQueries,
  activeTab,
  loadMoreTrigger,
}: {
  tabQueries: () => TQueries;
  activeTab: Ref<TTab>;
  loadMoreTrigger: Ref<HTMLElement | null>;
}) {
  const queries = tabQueries() as Record<TTab, {
    data: Ref<unknown[] | undefined>;
    isLoading?: ComputedRef<boolean>;
    isPending?: ComputedRef<boolean>;
    error: Ref<Error | null>;
    isError: ComputedRef<boolean>;
    isFetchingNextPage: ComputedRef<boolean>;
    hasNextPage: ComputedRef<boolean | undefined>;
    fetchNextPage: () => void;
  }>;

  const currentQuery = computed(() => queries[activeTab.value]);

  const currentData = computed(() => currentQuery.value.data.value);
  const currentLoading = computed(
    () => currentQuery.value.isLoading?.value ?? currentQuery.value.isPending?.value ?? false,
  );
  const currentError = computed(() => currentQuery.value.error.value);
  const currentIsError = computed(() => currentQuery.value.isError.value);
  const currentIsFetchingNextPage = computed(() => currentQuery.value.isFetchingNextPage.value);
  const currentHasNextPage = computed(() => currentQuery.value.hasNextPage.value);

  const fetchNextPage = (tab: TTab) => {
    queries[tab].fetchNextPage();
  };

  useIntersectionObserver(loadMoreTrigger, ([entry]) => {
    if (
      entry?.isIntersecting &&
      currentHasNextPage.value &&
      !currentIsFetchingNextPage.value
    ) {
      fetchNextPage(activeTab.value);
    }
  });

  return {
    currentData,
    currentLoading,
    currentError,
    currentIsError,
    currentIsFetchingNextPage,
    currentHasNextPage,
    fetchNextPage,
    queries,
  };
}
