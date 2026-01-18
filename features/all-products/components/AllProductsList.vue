<script setup lang="ts">
import type { TProductResponse } from "~/common/typedefs/query";
import type { TProductStatusFilter } from "./AllProducts.types";

interface Props {
  products: TProductResponse[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  } | null;
  isLoading: boolean;
  isError: boolean;
  error?: Error | null;
  status: TProductStatusFilter;
  categories: string[];
  activeFilterCount: number;
}

defineProps<Props>();

defineEmits<{
  "page-change": [page: number];
  "update:status": [value: TProductStatusFilter];
  "update:categories": [value: string[]];
  "clear-all": [];
}>();
</script>

<template>
  <div class="space-y-8">
    <ProductFiltersPanel
      :status="status"
      :categories="categories"
      :active-filter-count="activeFilterCount"
      @update:status="$emit('update:status', $event)"
      @update:categories="$emit('update:categories', $event)"
      @clear-all="$emit('clear-all')"
    />

    <div
      v-if="isError"
      class="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400"
    >
      Error loading products: {{ error?.message }}
    </div>

    <div
      v-else-if="isLoading"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="n in 8"
        :key="n"
        class="h-72 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800"
        :style="{ animationDelay: `${n * 0.1}s` }"
      ></div>
    </div>

    <div
      v-else-if="!products?.length"
      class="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50"
    >
      <p class="text-gray-500 dark:text-gray-400">
        {{
          activeFilterCount > 0
            ? "No products match your filters"
            : "No products found"
        }}
      </p>
      <UiButton
        v-if="activeFilterCount > 0"
        variant="outline"
        class="mt-4"
        @click="$emit('clear-all')"
      >
        Clear all filters
      </UiButton>
    </div>

    <div v-else>
      <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in-up"
        style="
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        "
      >
        <ProductCardContainer
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="hover-card h-full"
        />
      </div>

      <div class="mt-8 flex items-center justify-center space-x-4">
        <UiButton
          variant="outline"
          :disabled="!pagination || pagination.currentPage <= 1"
          @click="$emit('page-change', (pagination?.currentPage ?? 1) - 1)"
        >
          Previous
        </UiButton>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Page {{ pagination?.currentPage ?? 1 }} of
          {{ pagination?.totalPages ?? 1 }}
        </span>
        <UiButton
          variant="outline"
          :disabled="!pagination?.hasNextPage"
          @click="$emit('page-change', (pagination?.currentPage ?? 1) + 1)"
        >
          Next
        </UiButton>
      </div>
    </div>
  </div>
</template>
