<script setup lang="ts">
export interface ITabOption {
  value: string;
  label: string;
  icon: string;
}

interface Props {
  modelValue: string;
  tabs: ITabOption[];
}

interface Emits {
  (e: "update:modelValue", value: string): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <UiTabs
    :default-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', String(val))"
  >
    <UiTabsList class="grid w-full grid-cols-2">
      <UiTabsTrigger
        v-for="tab in tabs"
        :key="tab.value"
        :value="tab.value"
      >
        <Icon :name="tab.icon" class="mr-2 h-4 w-4" />
        {{ tab.label }}
      </UiTabsTrigger>
    </UiTabsList>
  </UiTabs>
</template>
