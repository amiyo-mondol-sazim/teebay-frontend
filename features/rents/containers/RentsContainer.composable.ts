export const useRentsQueries = (
  userId: ComputedRef<number | undefined>,
  activeTab: Ref<ERentsTab>,
  limit: number,
) => {
  const borrowsQuery = useBorrowsRentsInfiniteQuery(
    computed(() => userId.value ?? 0),
    { page: 1, limit },
    {
      enabled: computed(
        () => activeTab.value === ERentsTab.BORROWS && !!userId.value,
      ),
    },
  );

  const lentsQuery = useLentsRentsInfiniteQuery(
    computed(() => userId.value ?? 0),
    { page: 1, limit },
    {
      enabled: computed(
        () => activeTab.value === ERentsTab.LENTS && !!userId.value,
      ),
    },
  );

  return {
    borrowsQuery,
    lentsQuery,
  };
};

export const useRentsDualTabQuery = (
  userId: ComputedRef<number | undefined>,
  activeTab: Ref<ERentsTab>,
  loadMoreTrigger: Ref<HTMLElement | null>,
  limit = 12,
) => {
  const { borrowsQuery, lentsQuery } = useRentsQueries(userId, activeTab, limit);

  return useDualTabInfiniteQuery({
    tabQueries: () => ({
      [ERentsTab.BORROWS]: borrowsQuery,
      [ERentsTab.LENTS]: lentsQuery,
    }),
    activeTab,
    loadMoreTrigger,
  });
};
