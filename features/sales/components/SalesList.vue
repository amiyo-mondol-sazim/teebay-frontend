<script setup lang="ts">
import type { SALES_TAB_CONFIG } from "../sales.constants";

interface Props {
  activeTab: ESalesTab;
  tabConfig: typeof SALES_TAB_CONFIG;
  items: TSaleResponse[];
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
  "update:activeTab": [tab: ESalesTab];
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
          v-for="item in slotProps.items as TSaleResponse[]"
          :key="item.id"
          :transaction="item"
          type="sale"
          :tab="activeTab"
        />
      </template>
    </TransactionList>
  </div>
</template>
