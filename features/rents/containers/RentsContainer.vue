<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ERentsTab } from "~/common/typedefs/enums";
import type { TRentResponse } from "~/common/typedefs/query";

const { data: user, isLoading: isUserLoading } = useUserQuery();
const userId = computed(() => user.value?.id);

const activeTab = ref<ERentsTab>(ERentsTab.BORROWS);
const limit = 12;

const {
  data: borrowsData,
  fetchNextPage: fetchNextBorrowsPage,
  hasNextPage: hasNextBorrowsPage,
  isFetchingNextPage: isFetchingNextBorrowsPage,
  isLoading: isBorrowsLoading,
  isError: isBorrowsError,
  error: borrowsError,
} = useBorrowsRentsInfiniteQuery(
  computed(() => userId.value ?? 0),
  { page: 1, limit },
  {
    enabled: computed(
      () => activeTab.value === ERentsTab.BORROWS && !!userId.value,
    ),
  },
);

const {
  data: lentsData,
  fetchNextPage: fetchNextLentsPage,
  hasNextPage: hasNextLentsPage,
  isFetchingNextPage: isFetchingNextLentsPage,
  isLoading: isLentsLoading,
  isError: isLentsError,
  error: lentsError,
} = useLentsRentsInfiniteQuery(
  computed(() => userId.value ?? 0),
  { page: 1, limit },
  {
    enabled: computed(
      () => activeTab.value === ERentsTab.LENTS && !!userId.value,
    ),
  },
);

const currentData = computed(() =>
  activeTab.value === ERentsTab.BORROWS ? borrowsData.value : lentsData.value,
);
const currentLoading = computed(() =>
  activeTab.value === ERentsTab.BORROWS
    ? isBorrowsLoading.value
    : isLentsLoading.value,
);
const currentError = computed(() =>
  activeTab.value === ERentsTab.BORROWS ? borrowsError.value : lentsError.value,
);
const currentIsError = computed(() =>
  activeTab.value === ERentsTab.BORROWS
    ? isBorrowsError.value
    : isLentsError.value,
);
const currentIsFetchingNextPage = computed(() =>
  activeTab.value === ERentsTab.BORROWS
    ? isFetchingNextBorrowsPage.value
    : isFetchingNextLentsPage.value,
);
const currentHasNextPage = computed(() =>
  activeTab.value === ERentsTab.BORROWS
    ? hasNextBorrowsPage.value
    : hasNextLentsPage.value,
);

const loadMoreTrigger = ref<HTMLElement | null>(null);
const setLoadMoreTrigger = (ref: Element | ComponentPublicInstance | null) => {
  loadMoreTrigger.value = ref as HTMLElement | null;
};

useIntersectionObserver(loadMoreTrigger, ([entry]) => {
  if (
    entry?.isIntersecting &&
    currentHasNextPage.value &&
    !currentIsFetchingNextPage.value
  ) {
    if (activeTab.value === ERentsTab.BORROWS) fetchNextBorrowsPage();
    else fetchNextLentsPage();
  }
});

const rentsTabConfig = [
  { value: ERentsTab.BORROWS, label: "Borrows", icon: "ph:hand-bag" },
  { value: ERentsTab.LENTS, label: "Lents", icon: "ph:house" },
];

const rentsEmptyStateConfig = computed(() => ({
  icon: activeTab.value === ERentsTab.BORROWS ? "ph:hand-bag" : "ph:house",
  title: `No ${activeTab.value} yet`,
  description:
    activeTab.value === ERentsTab.BORROWS
      ? "Browse products to rent"
      : "List your items for rent",
}));
</script>

<template>
  <div v-if="userId" class="space-y-8">
    <div
      class="rounded-3xl bg-gradient-to-br from-primary/10 to-background p-8"
    >
      <h1 class="text-4xl font-bold font-serif">My Rents</h1>
      <p class="mt-2 text-muted-foreground">
        Track your borrows and lents history
      </p>
    </div>

    <TransactionTabs v-model="activeTab" :tabs="rentsTabConfig" />

    <TransactionList
      :items="currentData ?? []"
      :is-loading="currentLoading"
      :is-error="currentIsError"
      :error="currentError"
      :is-fetching-next-page="currentIsFetchingNextPage"
      :load-more-trigger-ref="setLoadMoreTrigger"
      :empty-state="rentsEmptyStateConfig"
    >
      <template #default="slotProps">
        <TransactionCard
          v-for="item in slotProps.items as TRentResponse[]"
          :key="item.id"
          :transaction="item"
          type="rent"
          :tab="activeTab"
        />
      </template>
    </TransactionList>
  </div>

  <div
    v-else-if="isUserLoading"
    class="flex min-h-[25rem] items-center justify-center"
  >
    <div class="juggle-loader" />
  </div>
</template>
