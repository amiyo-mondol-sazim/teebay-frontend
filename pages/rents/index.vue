<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "default",
});

useHead({
  title: "My Rents | Teebay",
  meta: [
    {
      name: "description",
      content: "Track your borrows and lents history",
    },
  ],
});
</script>

<template>
  <div class="container mx-auto px-4 py-8 md:py-12">
    <RentsContainer />
  </div>
</template>
