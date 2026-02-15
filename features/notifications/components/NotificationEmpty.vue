<script setup lang="ts">
interface Props {
  title: string;
  description: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 text-center">
    <div
      class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted"
    >
      <Icon name="ph:bell" class="h-8 w-8 text-muted-foreground" />
    </div>
    <h3 class="text-lg font-medium">{{ title }}</h3>
    <p class="mt-1 text-sm text-muted-foreground">{{ description }}</p>
  </div>
</template>
