<script setup lang="ts">
import ProductCard from "./ProductCard.vue";

interface Props {
  product: TProductResponse;
  isOwner?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOwner: false,
});

const router = useRouter();
const showDeleteDialog = ref(false);

const deleteMutation = useDeleteProductMutation();

const navigateToDetail = () => {
  router.push(`/products/${props.product.id}`);
};

const navigateToEdit = () => {
  router.push(`/products/${props.product.id}/edit`);
};

const confirmDelete = () => {
  showDeleteDialog.value = true;
};

const handleDelete = async () => {
  await deleteMutation.mutateAsync(props.product.id);
  showDeleteDialog.value = false;
};

const handleDeleteCancel = () => {
  showDeleteDialog.value = false;
};

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 1024;
});
</script>

<template>
  <ProductCard
    :product="product"
    :is-owner="isOwner"
    :show-delete-dialog="showDeleteDialog"
    :is-mobile="isMobile"
    :is-deleting="deleteMutation.isPending.value"
    @click="navigateToDetail"
    @edit-click="navigateToEdit"
    @delete-confirm="confirmDelete"
    @delete-cancel="handleDeleteCancel"
    @delete-action="handleDelete"
  />
</template>
