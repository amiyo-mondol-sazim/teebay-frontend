<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const page = computed({
  get: () => Number(route.query.page) || 1,
  set: (val) => {
    router.push({
      query: {
        ...route.query,
        page: val.toString(),
      },
    });
  },
});

const limit = 12;

const params = computed(() => ({
  page: page.value,
  limit,
}));

const { data, isLoading, isError, error } = useProductsQuery(params);

const handlePageChange = (newPage: number) => {
  page.value = newPage;
};

const normalizedProducts = computed(() => data.value?.data ?? []);
const pagination = computed(() => data.value?.meta);
</script>

<template>
  <AllProductsList
    :products="normalizedProducts"
    :pagination="pagination"
    :is-loading="isLoading"
    :is-error="isError"
    :error="error"
    @page-change="handlePageChange"
  />
</template>
