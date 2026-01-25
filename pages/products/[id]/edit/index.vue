<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

useHead({
  title: "Edit Product | Teebay",
  meta: [
    {
      name: "description",
      content: "Edit your product details",
    },
  ],
});

const route = useRoute();
const productId = computed(() => Number(route.params.id));
</script>

<template>
  <EditProductContainer :product-id="productId" />
</template>
