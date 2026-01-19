export const useSalesQueries = (
  userId: ComputedRef<number | undefined>,
  activeTab: Ref<ESalesTab>,
  limit: number,
) => {
  const boughtQuery = useBoughtSalesInfiniteQuery(
    computed(() => userId.value ?? 0),
    { page: 1, limit },
    {
      enabled: computed(
        () => activeTab.value === ESalesTab.BOUGHT && !!userId.value,
      ),
    },
  );

  const soldQuery = useSoldSalesInfiniteQuery(
    computed(() => userId.value ?? 0),
    { page: 1, limit },
    {
      enabled: computed(
        () => activeTab.value === ESalesTab.SOLD && !!userId.value,
      ),
    },
  );

  return {
    boughtQuery,
    soldQuery,
  };
};

export const useSales = (
  userId: ComputedRef<number | undefined>,
  activeTab: Ref<ESalesTab>,
  limit: number,
  loadMoreTrigger: Ref<HTMLElement | null>,
) => {
  const { boughtQuery, soldQuery } = useSalesQueries(userId, activeTab, limit);

  return useDualTabInfiniteQuery({
    tabQueries: () => ({
      [ESalesTab.BOUGHT]: boughtQuery,
      [ESalesTab.SOLD]: soldQuery,
    }),
    activeTab,
    loadMoreTrigger,
  });
};
