<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";

const { data: user, isLoading: isUserLoading } = useUserQuery();
const userId = computed(() => user.value?.id);

const activeTab = ref<ESalesTab>(ESalesTab.BOUGHT);
const limit = 12;

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

    <SalesTabs v-model="activeTab" />

    <SalesList
      :sales="currentData ?? []"
      :type="activeTab"
      :is-loading="currentLoading"
      :is-error="currentIsError"
      :error="currentError"
      :is-fetching-next-page="currentIsFetchingNextPage"
      :load-more-trigger-ref="setLoadMoreTrigger"
    />
  </div>

  <div
    v-else-if="isUserLoading"
    class="flex min-h-[400px] items-center justify-center"
  >
    <div class="juggle-loader" />
  </div>
</template>
