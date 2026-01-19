import type { TGetProductsQuery } from "~/common/typedefs/query";

const LIMIT = 12;

export const useAllProductsPagination = () => {
  const route = useRoute();
  const router = useRouter();

  const page = computed({
    get: () => Number(route.query.page) || 1,
    set: (val) => {
      router.push({
        query: {
          page: val.toString(),
        },
      });
    },
  });

  const resetPage = () => {
    page.value = 1;
  };

  return { page, resetPage, limit: LIMIT };
};

export const useAllProductsQuery = (params: Ref<TGetProductsQuery>) => {
  const { data, isLoading, isError, error } = useProductsQuery(params);

  const normalizedProducts = computed(() => data.value?.data ?? []);
  const pagination = computed(() => data.value?.meta);

  return {
    data,
    isLoading,
    isError,
    error,
    normalizedProducts,
    pagination,
  };
};

export const useAllProductsData = () => {
  const { page, resetPage, limit } = useAllProductsPagination();

  const {
    status,
    categories,
    activeFilterCount,
    queryParams: filterParams,
    setStatus,
    setCategories,
    clearAll,
  } = useProductFilters();

  const params = computed(() => ({
    page: page.value,
    limit,
    ...filterParams.value,
  }));

  const { isLoading, isError, error, normalizedProducts, pagination } = useAllProductsQuery(params);

  watch([status, categories], () => {
    resetPage();
  });

  const handlePageChange = (newPage: number) => {
    page.value = newPage;
  };

  const handleClearAllFilters = () => {
    clearAll();
  };

  return {
    normalizedProducts,
    pagination,
    isLoading,
    isError,
    error,
    status,
    categories,
    activeFilterCount,
    setStatus,
    setCategories,
    handlePageChange,
    handleClearAllFilters,
  };
};
