<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import type { TRentWithRenter } from "~/common/components/rent-calendar/rent-calendar.types";

interface Props {
  productId: number;
}

const props = defineProps<Props>();

const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
  useInfiniteProductRentsQuery(props.productId);

const rents = computed(
  () =>
    (data.value?.pages.flatMap((page) => page.data) as TRentWithRenter[]) ||
    [],
);

const loadMoreTrigger = ref<HTMLElement | null>(null);

const setLoadMoreTrigger = (ref: Element | ComponentPublicInstance | null) => {
  loadMoreTrigger.value = ref as HTMLElement | null;
};

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (entry?.isIntersecting && hasNextPage.value && !isFetchingNextPage.value) {
    fetchNextPage();
  }
});
</script>

<template>
  <PreviousRentals
    :rents="rents"
    :is-loading="isLoading"
    :is-fetching-next-page="isFetchingNextPage"
    :load-more-trigger-ref="setLoadMoreTrigger"
  />
</template>
