<script setup lang="ts">

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

const limit = 12;

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

const { data, isLoading, isError, error } = useProductsQuery(params);

const normalizedProducts = computed(() => data.value?.data ?? []);
const pagination = computed(() => data.value?.meta);

const handlePageChange = (newPage: number) => {
  page.value = newPage;
};

const handleClearAllFilters = () => {
  clearAll();
};

watch([status, categories], () => {
  page.value = 1;
});
</script>

<template>
  <AllProductsList
    :products="normalizedProducts"
    :pagination="pagination"
    :is-loading="isLoading"
    :is-error="isError"
    :error="error"
    :status="status"
    :categories="categories"
    :active-filter-count="activeFilterCount"
    @page-change="handlePageChange"
    @update:status="(val) => setStatus(val)"
    @update:categories="(val) => setCategories(val)"
    @clear-all="handleClearAllFilters"
  />
</template>
