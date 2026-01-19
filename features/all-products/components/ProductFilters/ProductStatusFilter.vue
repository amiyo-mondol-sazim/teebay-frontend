<script setup lang="ts">
import { PRODUCT_STATUS_FILTER_OPTIONS } from "../../AllProducts.types";

const props = defineProps<{
  modelValue: EProductStatusFilter;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: EProductStatusFilter): void;
}>();

const filters = computed(() => PRODUCT_STATUS_FILTER_OPTIONS);

const selectedFilter = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <span
      class="text-sm font-medium text-muted-foreground transition-colors duration-300"
    >
      Filter:
    </span>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="filter in filters"
        :key="filter.value"
        :class="[
          'group relative flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300',
          'hover:shadow-md click-active',
          selectedFilter === filter.value
            ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
            : 'border-border bg-card text-foreground/70 hover:text-foreground',
          filter.color,
        ]"
        @click="selectedFilter = filter.value"
      >
        <Icon
          :name="filter.icon"
          class="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
        />
        <span>{{ filter.label }}</span>
        <span
          v-if="selectedFilter === filter.value"
          class="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
        />
      </button>
    </div>
  </div>
</template>
