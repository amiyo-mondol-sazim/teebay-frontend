<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { formatCreatedDate } from "./product-details.helper";
import type { RentWithRenter } from "./product-details.types";

const props = defineProps<{ productId: number }>();

const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
  useInfiniteProductRentsQuery(props.productId);

const rents = computed(
  () =>
    (data.value?.pages.flatMap((page) => page.data) as RentWithRenter[]) || [],
);

const loadMoreTrigger = ref<HTMLElement | null>(null);

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (entry?.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage();
  }
});
</script>

<template>
  <div v-if="rents.length > 0 || isLoading" class="space-y-4 pt-4">
    <div class="flex items-center justify-between">
      <h3 class="font-serif text-lg font-bold text-foreground">
        Previous Rentals
      </h3>
    </div>

    <div class="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
      <div
        v-for="rent in rents"
        :key="rent.id"
        class="flex items-center justify-between rounded-lg border bg-card/50 p-3 text-sm shadow-sm transition-colors hover:bg-muted/50"
      >
        <div class="flex flex-col gap-1">
          <div class="font-medium text-foreground">
            {{ formatCreatedDate(rent.startDate) }} -
            {{ formatCreatedDate(rent.endDate) }}
          </div>
          <div v-if="rent.renter" class="text-xs text-muted-foreground">
            Rented by {{ rent.renter.userProfile?.firstName }}
            {{ rent.renter.userProfile?.lastName }}
          </div>
        </div>
        <div class="font-semibold text-primary">${{ rent.rentPrice }}</div>
      </div>

      <div v-if="isLoading" class="flex flex-col gap-2">
        <div
          v-for="i in 3"
          :key="i"
          class="h-14 w-full animate-pulse rounded-lg bg-muted"
        ></div>
      </div>

      <div
        ref="loadMoreTrigger"
        class="flex h-4 w-full items-center justify-center py-2"
      >
        <Icon
          v-if="isFetchingNextPage"
          name="heroicons:arrow-path"
          class="h-4 w-4 animate-spin text-muted-foreground"
        />
      </div>
    </div>
  </div>
</template>
