<script setup lang="ts">
import { getStatusLabel } from "./ProductFilters.helpers";

interface Props {
  status: EProductStatusFilter;
  categories: string[];
}

const props = defineProps<Props>();

defineEmits<{
  "remove-status": [];
  "remove-category": [category: string];
  "clear-all": [];
}>();

const statusLabel = computed(() => getStatusLabel(props));
</script>

<template>
  <div class="active-filters-rail">
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-sm font-medium text-muted-foreground"
        >Active filters:</span
      >

      <UiBadge
        v-if="props.status !== EProductStatusFilter.ALL"
        variant="secondary"
        class="group active-filter-badge cursor-pointer transition-all hover:bg-destructive/10 hover:text-destructive"
        @click="$emit('remove-status')"
      >
        {{ statusLabel }}
        <Icon
          name="ph:x"
          class="ml-1 h-3 w-3 opacity-60 group-hover:opacity-100"
        />
      </UiBadge>

      <UiBadge
        v-for="category in props.categories"
        :key="category"
        variant="secondary"
        class="group active-filter-badge cursor-pointer transition-all hover:bg-destructive/10 hover:text-destructive"
        @click="$emit('remove-category', category)"
      >
        {{ category }}
        <Icon
          name="ph:x"
          class="ml-1 h-3 w-3 opacity-60 group-hover:opacity-100"
        />
      </UiBadge>

      <UiButton
        variant="ghost"
        size="sm"
        class="ml-auto h-7 text-xs text-muted-foreground hover:text-destructive"
        @click="$emit('clear-all')"
      >
        Clear all
      </UiButton>
    </div>
  </div>
</template>

<style scoped>
.active-filter-badge {
  animation: fade-in 200ms ease-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
