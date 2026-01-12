<script setup lang="ts">
const props = defineProps<{ class?: string; showCurrency?: boolean }>();
</script>

<template>
  <div :class="cn('rounded-2xl border bg-white p-7 shadow-[1px_2px_6px_0px_rgba(12,21,30,0.04)]', props.class)">
    <div class="mb-6">
      <UiSkeleton class="h-4 w-40" />
    </div>
    <div class="mb-3 flex items-baseline gap-2">
      <UiSkeleton class="h-8 w-28" />
      <UiSkeleton v-if="props.showCurrency" class="h-5 w-12 rounded" />
    </div>
    <div class="flex items-center gap-1">
      <UiSkeleton class="h-4 w-14 rounded" />
      <UiSkeleton class="h-4 w-28 rounded" />
    </div>
  </div>
</template>
