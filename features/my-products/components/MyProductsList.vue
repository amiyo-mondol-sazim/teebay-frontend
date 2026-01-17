<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import type { TProductResponse } from "~/common/typedefs/query";

const props = defineProps<{
  ownerId: number;
  statusFilter: TProductStatus | "ALL";
}>();

const limit = 12;

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
  error,
} = useOwnerProductsInfiniteQuery(
  computed(() => props.ownerId),
  { page: 1, limit },
);

// Filter products based on statusFilter (client-side filtering)
const products = computed(() => {
  const allProducts = (data.value as TProductResponse[]) || [];
  if (props.statusFilter === "ALL") {
    return allProducts;
  }
  return allProducts.filter((p) => p.status === props.statusFilter);
});

const loadMoreTrigger = ref<HTMLElement | null>(null);

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (entry?.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage();
  }
});

// Stagger animation delay for product cards
const getAnimationDelay = (index: number) => `${Math.min(index * 0.05, 0.5)}s`;
</script>

<template>
  <div class="space-y-6">
    <!-- Loading State - Animated Skeletons -->
    <div
      v-if="isLoading"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <div
        v-for="n in 8"
        :key="n"
        class="h-72 animate-pulse rounded-xl bg-muted/50"
        :style="{ animationDelay: `${n * 0.1}s` }"
      />
    </div>

    <!-- Error State -->
    <div
      v-else-if="isError"
      class="overflow-hidden rounded-xl border border-destructive/20 bg-destructive/5 p-6"
    >
      <div class="flex items-start gap-4">
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/10"
        >
          <Icon name="ph:warning-circle" class="h-6 w-6 text-destructive" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-destructive">
            Failed to load products
          </h3>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ error?.message || "An unexpected error occurred" }}
          </p>
        </div>
        <UiButton variant="outline" size="sm" @click="$router.go(0)">
          <Icon name="ph:arrow-counter-clockwise" class="mr-2 h-4 w-4" />
          Retry
        </UiButton>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!products.length"
      class="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-muted-foreground/25 bg-muted/30 p-12 text-center"
    >
      <div
        class="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
      >
        <Icon name="ph:package" class="h-10 w-10 text-primary" />
      </div>
      <h3 class="text-xl font-semibold text-foreground">No products found</h3>
      <p class="mt-2 max-w-sm text-muted-foreground">
        You don't have any products matching the current filter. Try changing
        the filter or add your first product.
      </p>
    </div>

    <!-- Products Grid with Enhanced Cards -->
    <div v-else class="space-y-8">
      <div
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <TransitionGroup
          enter-active-class="transition-all duration-500 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
        >
          <div
            v-for="(product, index) in products"
            :key="product.id"
            :style="{ animationDelay: getAnimationDelay(index) }"
            class="animate-fade-in-up"
          >
            <ProductCard :product="product" class="hover-card h-full" />
          </div>
        </TransitionGroup>
      </div>

      <!-- Infinite Scroll Trigger -->
      <div ref="loadMoreTrigger" class="flex h-12 items-center justify-center">
        <div
          v-if="isFetchingNextPage"
          class="flex items-center gap-3 text-muted-foreground"
        >
          <Icon name="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
          <span class="text-sm">Loading more products...</span>
        </div>
      </div>
    </div>
  </div>
</template>
