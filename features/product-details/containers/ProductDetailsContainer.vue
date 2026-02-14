<script setup lang="ts">
interface Props {
  productId: number;
}

defineProps<Props>();
</script>

<template>
  <ProductDetailsCard :product-id="productId" />
</template>
