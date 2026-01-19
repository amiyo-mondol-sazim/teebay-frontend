<script setup lang="ts">
import type { RENTS_TAB_CONFIG } from "../rents.constants";

interface Props {
  activeTab: ERentsTab;
  tabConfig: typeof RENTS_TAB_CONFIG;
  items: TRentResponse[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isFetchingNextPage: boolean;
  loadMoreTriggerRef: (ref: Element | ComponentPublicInstance | null) => void;
  emptyState: {
    icon: string;
    title: string;
    description: string;
  };
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:activeTab": [tab: ERentsTab];
}>();

const activeTab = computed({
  get: () => props.activeTab,
  set: (value) => emit("update:activeTab", value),
});
</script>

<template>
  <div class="space-y-6">
    <TransactionTabs v-model="activeTab" :tabs="tabConfig" />

    <TransactionList
      :items="items"
      :is-loading="isLoading"
      :is-error="isError"
      :error="error"
      :is-fetching-next-page="isFetchingNextPage"
      :load-more-trigger-ref="loadMoreTriggerRef"
      :empty-state="emptyState"
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
</template>
