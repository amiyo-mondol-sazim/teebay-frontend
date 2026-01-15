<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>

<template>
  <div class="h-full w-full p-4 sm:p-6 lg:p-8">
    <AllProductsContainer />
  </div>
</template>
