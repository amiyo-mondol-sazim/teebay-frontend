<script setup lang="ts">
interface Props {
  modelValue: ESalesTab;
}

interface Emits {
  (e: "update:modelValue", value: ESalesTab): void;
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<template>
  <UiTabs
    :default-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event as ESalesTab)"
  >
    <UiTabsList class="grid w-full grid-cols-2">
      <UiTabsTrigger :value="ESalesTab.BOUGHT">
        <Icon name="ph:shopping-cart" class="mr-2 h-4 w-4" />
        Bought
      </UiTabsTrigger>
      <UiTabsTrigger :value="ESalesTab.SOLD">
        <Icon name="ph:currency-dollar" class="mr-2 h-4 w-4" />
        Sold
      </UiTabsTrigger>
    </UiTabsList>
  </UiTabs>
</template>
