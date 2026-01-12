<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div class="bg-gray-20 flex items-center justify-center rounded-sm" :class="props.class">
    <Icon name="ph:image-square-fill" class="text-primary size-16 opacity-50" />
  </div>
</template>
