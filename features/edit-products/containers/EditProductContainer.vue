<script setup lang="ts">
defineProps<{
  productId: number;
}>();
</script>

<template>
  <EditProductForm :product-id="productId" />
</template>
