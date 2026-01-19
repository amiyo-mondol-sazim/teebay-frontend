<script setup lang="ts">
import { SALES_EMPTY_STATE_CONFIG, SALES_TAB_CONFIG } from "../sales.constants";
import { useSales } from "./SalesContainer.composable";

const { data: user, isLoading: isUserLoading } = useUserQuery();
const userId = computed(() => user.value?.id);
const { loadMoreTrigger, setLoadMoreTrigger } = useLoadMoreTrigger();

const activeTab = ref<ESalesTab>(ESalesTab.BOUGHT);
const limit = 12;

const {
  currentData,
  currentLoading,
  currentError,
  currentIsError,
  currentIsFetchingNextPage,
} = useSales(userId, activeTab, limit, loadMoreTrigger);

const salesEmptyStateConfig = computed(
  () => SALES_EMPTY_STATE_CONFIG[activeTab.value],
);
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

    <SalesList
      v-model:active-tab="activeTab"
      :tab-config="SALES_TAB_CONFIG"
      :items="(currentData ?? []) as TSaleResponse[]"
      :is-loading="currentLoading"
      :is-error="currentIsError"
      :error="currentError"
      :is-fetching-next-page="currentIsFetchingNextPage"
      :load-more-trigger-ref="setLoadMoreTrigger"
      :empty-state="salesEmptyStateConfig"
    />
  </div>

  <div
    v-else-if="isUserLoading"
    class="flex min-h-[25rem] items-center justify-center"
  >
    <div class="juggle-loader" />
  </div>
</template>
