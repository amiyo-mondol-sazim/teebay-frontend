<script setup lang="ts">
import type { IKPICardProps } from './KPICard.types';

defineProps<IKPICardProps>();
</script>

<template>
  <div class="rounded-2xl border bg-white p-7 shadow-[1px_2px_6px_0px_rgba(12,21,30,0.04)]">
    <p class="mb-6 text-sm leading-none font-semibold text-gray-200">{{ label }}</p>
    <div class="mb-3 flex items-baseline gap-2">
      <span class="text-[1.75rem] leading-none font-black">{{ value.toLocaleString() }}</span>
      <span v-if="currency" class="text-gray-60 text-lg leading-none font-bold">{{ currency }}</span>
    </div>
    <div v-if="change" class="flex items-center gap-1">
      <span :class="isPositive ? 'text-primary' : 'text-error-300'" class="text-sm leading-none font-bold">
        {{ isPositive ? '+' : '-' }}{{ change }}%
      </span>
      <span class="text-sm leading-none text-gray-400">{{ changeLabel }}</span>
    </div>
  </div>
</template>
