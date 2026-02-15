<script setup lang="ts">
import {
  useFilteredProducts,
  useInfiniteScroll,
  useMyProductsState,
} from "./MyProductsContainer.composables";
import { getAnimationDelay } from "./MyProductsContainer.helpers";

const {
  isUserLoading,
  statusFilter,
  ownerId,
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  isError,
  error,
} = useMyProductsState();

const { products, allProducts } = useFilteredProducts(data, statusFilter);

const { loadMoreTrigger, setLoadMoreTrigger } = useLoadMoreTrigger();

useInfiniteScroll(
  loadMoreTrigger,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
);
</script>

<template>
  <div v-if="ownerId" class="space-y-8">
    <div
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 md:p-12"
    >
      <div
        class="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
      />
      <div
        class="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
      />

      <div class="relative z-10">
        <div
          class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
        >
          <div class="space-y-2">
            <div
              class="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
            >
              <Icon name="ph:user" class="h-3.5 w-3.5" />
              <span>My Inventory</span>
            </div>
            <h1
              class="text-4xl font-bold tracking-tight text-foreground md:text-5xl font-serif"
            >
              My Products
            </h1>
            <p class="max-w-xl text-muted-foreground">
              Manage your product inventory, track rental status, and monitor
              sales all in one place.
            </p>
          </div>

          <NuxtLink to="/add-product">
            <UiButton
              size="lg"
              class="shadow-lg shadow-primary/20 cursor-pointer"
            >
              <Icon name="ph:plus" class="mr-2 h-5 w-5" />
              Add Product
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </div>

    <ProductStatsBar :products="allProducts" />

    <div
      class="flex items-center justify-between border-b border-border/50 pb-6"
    >
      <StatusFilter v-model="statusFilter" />
    </div>

    <MyProductsList
      :products="products"
      :is-loading="isLoading"
      :is-error="isError"
      :error="error"
      :is-fetching-next-page="isFetchingNextPage"
      :load-more-trigger-ref="setLoadMoreTrigger"
      :get-animation-delay="getAnimationDelay"
    />
  </div>

  <div
    v-else-if="isUserLoading"
    class="flex min-h-[25rem] items-center justify-center"
  >
    <div class="flex flex-col items-center gap-4">
      <div class="juggle-loader" />
      <p class="text-sm text-muted-foreground">Loading your profile...</p>
    </div>
  </div>
</template>
