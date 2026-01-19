<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "default",
});

useHead({
  title: "My Products | Teebay",
  meta: [
    {
      name: "description",
      content: "Manage your products and track their status",
    },
  ],
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 md:py-12">
    <MyProductsContainer />
  </div>
</template>
