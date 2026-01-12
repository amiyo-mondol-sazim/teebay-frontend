<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>
<template>
  <header class="border-gray-20 flex h-22.5 items-center border-b bg-white px-7">
    <div class="container mx-auto flex items-center px-3">
      <h1 class="text-[1.375rem] font-semibold">{{ title }}</h1>
    </div>
  </header>
</template>
