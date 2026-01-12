<script setup lang="ts">
import { FORM_TABS } from './NewOfferFormTabs.constants';
import type { ENewOfferFormTab } from './NewOfferFormTabs.enums';

const emits = defineEmits<{
  (e: 'tabChange', value: ENewOfferFormTab): void;
}>();
</script>

<template>
  <UiTabsList class="text-foreground tabs-list block h-auto w-full space-y-[0.375rem] bg-transparent">
    <UiTabsTrigger
      v-for="tab in FORM_TABS"
      :key="tab.value"
      :value="tab.value"
      as-child
      class="form-tab group data-[state=active]:bg-primary/10 data-[state=active]:text-foreground h-11.5 w-full justify-start gap-3 rounded-[2.5rem] px-5 text-base leading-none shadow-none data-[state=active]:border-transparent data-[state=active]:shadow-none [&:not([data-state=active])]:opacity-35"
      @click="emits('tabChange', tab.value)"
    >
      <UiButton variant="ghost">
        <Icon name="ph:check-circle-fill" class="icon-check text-primary size-4.5 scale-120" />
        <span
          class="indicator group-data-[state=active]:border-primary size-4.5 rounded-full border-2 border-gray-900"
        />
        {{ tab.label }}
      </UiButton>
    </UiTabsTrigger>
  </UiTabsList>
</template>

<style scoped>
.form-tab span.indicator {
  @apply hidden;
}
.form-tab[data-state='active'],
.form-tab[data-state='active'] ~ .form-tab {
  svg.icon-check {
    @apply hidden;
  }
  span.indicator {
    @apply block;
  }
}
</style>
