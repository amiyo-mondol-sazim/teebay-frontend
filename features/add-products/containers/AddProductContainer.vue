<script setup lang="ts">
import { useCreateProductMutation } from "~/common/api/products/products.mutations";
import type { TCreateProductInput } from "~/common/typedefs/products";

const { mutate: createProduct, isPending } = useCreateProductMutation();

const handleSubmit = (values: TCreateProductInput) => {
  createProduct(values);
};

const handleCancel = () => {
  navigateTo("/my-products");
};
</script>

<template>
  <AddProductForm :is-pending="isPending" @submit="handleSubmit" @cancel="handleCancel" />
</template>
