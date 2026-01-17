<script setup lang="ts">
import { useCreateProductMutation } from "~/common/api/products/products.mutations";
import type { TAddProductInput } from "~/features/add-products/components/AddProductForm/AddProductForm.helpers";

const { mutate: createProduct, isPending } = useCreateProductMutation();

const handleSubmit = (values: TAddProductInput) => {
  createProduct(values);
};
</script>

<template>
  <div class="container mx-auto py-8">
    <AddProductForm :is-pending="isPending" @submit="handleSubmit" />
  </div>
</template>
