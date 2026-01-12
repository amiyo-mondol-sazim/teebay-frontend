<script setup lang="ts">
import type { TOfferQueryStatus } from '~/common/typedefs/api';
import { offerTabs } from './MyOfferTabs.helpers';

const currentTab = defineModel<TOfferQueryStatus>({ default: 'active' });

const { data: statusCounts } = useOfferStatusCountQuery();
</script>

<template>
  <UiTabs :model-value="currentTab" class="w-full">
    <UiTabsList class="w-full justify-start gap-3 bg-transparent">
      <UiTabsTrigger
        v-for="tab in offerTabs"
        :key="tab.value"
        :value="tab.value"
        :class="
          cn(
            'font-figtree border-gray-40 h-10 flex-0 gap-2 rounded-full border px-4.5 text-base leading-none text-gray-100',
            'data-[state=active]:shadow-none [&_svg]:hidden data-[state=active]:[&_svg]:block',
            tab.tabClass,
          )
        "
        @click="currentTab = tab.value"
      >
        <Icon v-if="!tab.hideIcon" class="size-2.5" name="custom:circle-fill" />
        <span> {{ tab.label }} ({{ statusCounts?.[tab.value] ?? 0 }})</span>
      </UiTabsTrigger>
    </UiTabsList>
  </UiTabs>
</template>
