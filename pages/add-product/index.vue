<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});

useHead({
  title: "Add Product | Teebay",
  meta: [
    {
      name: "description",
      content: "Add a new product to your inventory",
    },
  ],
});
</script>

<template>
  <div class="flex min-h-screen w-full items-center justify-center">
    <AddProductContainer />
  </div>
</template>
