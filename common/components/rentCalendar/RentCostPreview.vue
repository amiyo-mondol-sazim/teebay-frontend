<script setup lang="ts">
interface Props {
  totalCost: number;
  duration: string | null;
  dailyRate: number;
}

defineProps<Props>();
</script>

<template>
  <div
    v-if="totalCost > 0"
    class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/60 shadow-lg"
  >
    <div
      class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"
    ></div>
    <div
      class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"
    ></div>

    <div class="relative p-5 space-y-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-slate-600">Duration</span>
        <span class="text-sm font-semibold text-slate-800">{{ duration }}</span>
      </div>

      <div
        class="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
      ></div>

      <div class="flex items-center justify-between">
        <span class="text-sm font-medium text-slate-600">Daily Rate</span>
        <span class="text-sm font-semibold text-slate-800">
          ${{ dailyRate.toFixed(2) }}
        </span>
      </div>

      <div
        class="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"
      ></div>

      <div class="flex items-baseline gap-1">
        <span class="text-sm font-medium text-slate-600">Total Cost</span>
        <span class="flex-1"></span>
        <span
          class="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent"
        >
          ${{ totalCost.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>

  <div
    v-else
    class="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100"
  >
    <div
      class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0"
    >
      <Icon name="ph:info" class="w-5 h-5 text-indigo-600" />
    </div>
    <p class="text-sm text-slate-600">
      Select your rental dates to see the estimated cost
    </p>
  </div>
</template>
