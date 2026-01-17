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
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2
        class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-50"
      >
        All Products
      </h2>
    </div>

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
      v-else-if="!data?.data?.length"
      class="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50"
    >
      <p class="text-gray-500 dark:text-gray-400">No products found</p>
    </div>

    <div v-else>
      <div
        :key="page"
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-in-up"
        style="animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      >
        <ProductCardContainer
          v-for="product in data.data"
          :key="product.id"
          :product="product"
          class="hover-card h-full"
        />
      </div>

      <div class="mt-8 flex items-center justify-center space-x-4">
        <UiButton
          variant="outline"
          :disabled="(data?.meta?.currentPage ?? 1) <= 1"
          @click="page--"
        >
          Previous
        </UiButton>
        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Page {{ data?.meta?.currentPage }} of {{ data?.meta?.totalPages }}
        </span>
        <UiButton
          variant="outline"
          :disabled="!data?.meta?.hasNextPage"
          @click="page++"
        >
          Next
        </UiButton>
      </div>
    </div>
  </div>
</template>
