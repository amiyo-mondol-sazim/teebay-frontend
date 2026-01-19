<script setup lang="ts">
import { useAllProductsData } from "./AllProducts.composables";

const {
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
} = useAllProductsData();
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
    @update:status="setStatus"
    @update:categories="setCategories"
    @clear-all="handleClearAllFilters"
  />
</template>
