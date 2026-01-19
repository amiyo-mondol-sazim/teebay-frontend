<script setup lang="ts">
import { RENTS_EMPTY_STATE_CONFIG, RENTS_TAB_CONFIG } from "../rents.constants";
import { useRentsDualTabQuery } from "./RentsContainer.composable";

const { data: user, isLoading: isUserLoading } = useUserQuery();
const userId = computed(() => user.value?.id);
const { loadMoreTrigger, setLoadMoreTrigger } = useLoadMoreTrigger();

const activeTab = ref<ERentsTab>(ERentsTab.BORROWS);

const {
  currentData,
  currentLoading,
  currentError,
  currentIsError,
  currentIsFetchingNextPage,
} = useRentsDualTabQuery(userId, activeTab, loadMoreTrigger);

const rentsEmptyStateConfig = computed(
  () => RENTS_EMPTY_STATE_CONFIG[activeTab.value],
);
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

    <RentList
      v-model:active-tab="activeTab"
      :tab-config="RENTS_TAB_CONFIG"
      :items="(currentData ?? []) as TRentResponse[]"
      :is-loading="currentLoading"
      :is-error="currentIsError"
      :error="currentError"
      :is-fetching-next-page="currentIsFetchingNextPage"
      :load-more-trigger-ref="setLoadMoreTrigger"
      :empty-state="rentsEmptyStateConfig"
    />
  </div>

  <div
    v-else-if="isUserLoading"
    class="flex min-h-[25rem] items-center justify-center"
  >
    <div class="juggle-loader" />
  </div>
</template>
