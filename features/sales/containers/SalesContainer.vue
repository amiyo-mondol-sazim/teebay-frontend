<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";

const { data: user, isLoading: isUserLoading } = useUserQuery();
const userId = computed(() => user.value?.id);

const activeTab = ref<ESalesTab>(ESalesTab.BOUGHT);
const limit = 12;

const salesTabConfig = [
  { value: ESalesTab.BOUGHT, label: 'Bought', icon: 'ph:shopping-cart' },
  { value: ESalesTab.SOLD, label: 'Sold', icon: 'ph:currency-dollar' }
];

const salesEmptyStateConfig = computed(() => ({
  icon: activeTab.value === ESalesTab.BOUGHT ? 'ph:shopping-cart' : 'ph:currency-dollar',
  title: `No ${activeTab.value} items yet`,
  description: activeTab.value === ESalesTab.BOUGHT ? 'Start shopping' : 'Make your first sale'
}));

const {
  data: boughtData,
  fetchNextPage: fetchNextBoughtPage,
  hasNextPage: hasNextBoughtPage,
  isFetchingNextPage: isFetchingNextBoughtPage,
  isLoading: isBoughtLoading,
  isError: isBoughtError,
  error: boughtError,
} = useBoughtSalesInfiniteQuery(
  computed(() => userId.value ?? 0),
  { page: 1, limit },
  {
    enabled: computed(
      () => activeTab.value === ESalesTab.BOUGHT && !!userId.value,
    ),
  },
);

const {
  data: soldData,
  fetchNextPage: fetchNextSoldPage,
  hasNextPage: hasNextSoldPage,
  isFetchingNextPage: isFetchingNextSoldPage,
  isLoading: isSoldLoading,
  isError: isSoldError,
  error: soldError,
} = useSoldSalesInfiniteQuery(
  computed(() => userId.value ?? 0),
  { page: 1, limit },
  {
    enabled: computed(
      () => activeTab.value === ESalesTab.SOLD && !!userId.value,
    ),
  },
);

const currentData = computed(() =>
  activeTab.value === ESalesTab.BOUGHT ? boughtData.value : soldData.value,
);
const currentLoading = computed(() =>
  activeTab.value === ESalesTab.BOUGHT
    ? isBoughtLoading.value
    : isSoldLoading.value,
);
const currentError = computed(() =>
  activeTab.value === ESalesTab.BOUGHT ? boughtError.value : soldError.value,
);
const currentIsError = computed(() =>
  activeTab.value === ESalesTab.BOUGHT
    ? isBoughtError.value
    : isSoldError.value,
);
const currentIsFetchingNextPage = computed(() =>
  activeTab.value === ESalesTab.BOUGHT
    ? isFetchingNextBoughtPage.value
    : isFetchingNextSoldPage.value,
);
const currentHasNextPage = computed(() =>
  activeTab.value === ESalesTab.BOUGHT
    ? hasNextBoughtPage.value
    : hasNextSoldPage.value,
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
    if (activeTab.value === ESalesTab.BOUGHT) fetchNextBoughtPage();
    else fetchNextSoldPage();
  }
});
</script>

<template>
  <div v-if="userId" class="space-y-8">
    <div
      class="rounded-3xl bg-gradient-to-br from-primary/10 to-background p-8"
    >
      <h1 class="text-4xl font-bold font-serif">My Sales</h1>
      <p class="mt-2 text-muted-foreground">
        Track your purchases and sales history
      </p>
    </div>

    <TransactionTabs v-model="activeTab" :tabs="salesTabConfig" />

    <TransactionList
      :items="currentData ?? []"
      :is-loading="currentLoading"
      :is-error="currentIsError"
      :error="currentError"
      :is-fetching-next-page="currentIsFetchingNextPage"
      :load-more-trigger-ref="setLoadMoreTrigger"
      :empty-state="salesEmptyStateConfig"
    >
      <template #default="slotProps">
        <TransactionCard
          v-for="item in slotProps.items as TSaleResponse[]"
          :key="item.id"
          :transaction="item"
          type="sale"
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
