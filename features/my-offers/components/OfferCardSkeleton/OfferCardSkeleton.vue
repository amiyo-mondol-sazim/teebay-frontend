<script setup lang="ts">
const props = defineProps<{ class?: string }>();
</script>

<template>
  <div :class="cn('flex flex-row gap-7 rounded-xl border border-transparent px-8 py-6', props.class)">
    <div class="h-50 w-70 flex-shrink-0 overflow-hidden rounded-lg">
      <UiSkeleton class="h-full w-full" />
    </div>
    <div class="flex flex-1 flex-col justify-center gap-6">
      <div class="space-y-1">
        <div>
          <UiSkeleton class="inline-flex h-6 w-24 items-center gap-1 rounded-full px-2 py-1.5" />
        </div>
        <div class="flex justify-between">
          <div class="flex flex-1 flex-col gap-4">
            <UiSkeleton class="h-6 w-72 rounded" />
            <UiSkeleton class="h-4 w-32 rounded" />
          </div>
          <div class="flex flex-col items-end gap-4">
            <UiSkeleton class="h-4 w-20 rounded" />
            <div class="flex h-4 items-center gap-2.5">
              <UiSkeleton class="size-6 rounded-full" />
              <UiSkeleton class="h-4 w-16 rounded" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-4.5">
        <div v-for="i in 3" :key="i" class="bg-primary/3 flex flex-1 flex-col gap-3 rounded-[1.25rem] p-5">
          <UiSkeleton class="h-3 w-16 rounded" />
          <UiSkeleton class="h-5 w-12 rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
