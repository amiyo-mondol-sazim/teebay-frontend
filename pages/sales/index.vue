<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "default",
});

useHead({
  title: "My Sales | Teebay",
  meta: [
    {
      name: "description",
      content: "Track your purchases and sales history",
    },
  ],
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 md:py-12">
    <SalesContainer />
  </div>
</template>
