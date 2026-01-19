<script setup lang="ts">
import ProductCard from "./ProductCard.vue";

interface Props {
  product: TProductResponse;
  isOwner?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOwner: false,
});

const { navigateToDetail, navigateToEdit } = useProductCardNavigation(
  toRef(props, "product"),
);
const {
  showDeleteDialog,
  isDeleting,
  confirmDelete,
  handleDelete,
  handleDeleteCancel,
} = useProductDelete(toRef(() => props.product.id));
const { isMobile } = useMobileDetection();
</script>

<template>
  <ProductCard
    :product="product"
    :is-owner="isOwner"
    :show-delete-dialog="showDeleteDialog"
    :is-mobile="isMobile"
    :is-deleting="isDeleting"
    @click="navigateToDetail"
    @edit-click="navigateToEdit"
    @delete-confirm="confirmDelete"
    @delete-cancel="handleDeleteCancel"
    @delete-action="handleDelete"
  />
</template>
