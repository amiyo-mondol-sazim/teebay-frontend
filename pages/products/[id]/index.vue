<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});

useHead({
  title: "Product Details | Teebay",
  meta: [
    {
      name: "description",
      content: "Displays the details of a specific product",
    },
  ],
});

const route = useRoute();
const productId = computed(() => Number(route.params.id));

if (!productId.value || isNaN(productId.value)) {
  throw createError({ statusCode: 404, statusMessage: "Product not found" });
}
</script>

<template>
  <div class="h-full w-full p-4 sm:p-6 lg:p-8">
    <BackButton class="mb-4" />
    <ProductDetailsContainer :product-id="productId" />
  </div>
</template>
