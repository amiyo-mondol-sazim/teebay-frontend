<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { FORMAT_CREATED_DATE } from "./product-details.helper";
import type { TRentWithRenter } from "~/common/components/rent-calendar/rent-calendar.types";

const PREVIOUS_RENTALS_HEIGHT = '21.875rem'; // 350px

const props = defineProps<{ productId: number }>();

const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
  useInfiniteProductRentsQuery(props.productId);

const rents = computed(
  () =>
    (data.value?.pages.flatMap((page) => page.data) as TRentWithRenter[]) || [],
);

const loadMoreTrigger = ref<HTMLElement | null>(null);

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (entry?.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage();
  }
});
</script>

<template>
  <div class="space-y-4 pt-4 flex flex-col" :style="{ height: PREVIOUS_RENTALS_HEIGHT }">
    <div class="flex items-center justify-between shrink-0">
      <h3 class="font-serif text-lg font-bold text-foreground">
        Previous Rentals
      </h3>
    </div>

    <UiScrollArea class="flex-1 min-h-0 pr-3 -mr-3">
      <div
        v-for="rent in rents"
        :key="rent.id"
        class="flex items-center justify-between rounded-lg border bg-card/50 p-3 text-sm shadow-sm transition-colors hover:bg-muted/50"
      >
        <div class="flex flex-col gap-1">
          <div class="font-medium text-foreground">
            {{ FORMAT_CREATED_DATE(rent.startDate) }} -
            {{ FORMAT_CREATED_DATE(rent.endDate) }}
          </div>
          <div v-if="rent.renter" class="text-xs text-muted-foreground">
            Rented by {{ rent.renter.userProfile?.firstName }}
            {{ rent.renter.userProfile?.lastName }}
          </div>
        </div>
        <div class="font-semibold text-primary">${{ rent.rentPrice }}</div>
      </div>

      <div
        v-if="!isLoading && rents.length === 0"
        class="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 p-20 text-center"
      >
        <Icon
          name="heroicons:calendar"
          class="mb-2 h-10 w-10 text-muted-foreground"
        />
        <p class="text-sm font-medium text-muted-foreground">
          No rental history yet
        </p>
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
    </UiScrollArea>
  </div>
</template>
