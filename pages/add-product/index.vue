<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>

<template>
  <div class="flex min-h-screen w-full items-center justify-center">
    <AddProductContainer />
  </div>
</template>
