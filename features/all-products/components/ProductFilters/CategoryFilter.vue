<script setup lang="ts">
import { AVAILABLE_CATEGORIES } from "~/common/utils/constants";

interface Props {
  modelValue: string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

const toggleCategory = (category: string) => {
  const currentValue = props.modelValue || [];
  const newValue = currentValue.includes(category)
    ? currentValue.filter((c) => c !== category)
    : [...currentValue, category];
  emit("update:modelValue", newValue);
};
</script>

<template>
  <UiPopover>
    <UiPopoverTrigger as-child>
      <UiButton
        variant="outline"
        :class="[
          'category-filter-trigger transition-all duration-300',
          modelValue.length > 0 && 'border-primary/50 bg-primary/5',
        ]"
      >
        <Icon name="ph:tag" class="mr-2 h-4 w-4" />
        <span>Categories</span>
        <UiBadge
          v-if="modelValue.length > 0"
          variant="secondary"
          class="ml-2 h-5 min-w-5 px-1"
        >
          {{ modelValue.length }}
        </UiBadge>
        <Icon name="ph:caret-down" class="ml-2 h-4 w-4 opacity-50" />
      </UiButton>
    </UiPopoverTrigger>

    <UiPopoverContent class="category-filter-content w-48 p-2" align="end">
      <div class="space-y-1">
        <div
          v-for="category in AVAILABLE_CATEGORIES"
          :key="category"
          :class="[
            'category-item flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors cursor-pointer',
            'hover:bg-accent/5',
            modelValue.includes(category) && 'bg-accent/10',
          ]"
          @click="toggleCategory(category)"
        >
          <UiCheckbox :model-value="(modelValue || []).includes(category)" />
          <span>{{ category }}</span>
        </div>
      </div>
    </UiPopoverContent>
  </UiPopover>
</template>
