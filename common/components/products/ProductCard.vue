<script setup lang="ts">
import { PRODUCT_STATUS_CLASSES } from "./products.helper";

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

const isMobile = ref(false);

onMounted(() => {
  isMobile.value = window.innerWidth < 1024;
});
</script>

<template>
  <div
    class="group relative cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
    @click="navigateToDetail"
  >
    <div
      v-if="isOwner"
      class="absolute right-3 top-3 z-10 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:opacity-0"
      :class="{ 'opacity-100': isMobile }"
    >
      <button
        class="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-md ring-1 ring-gray-200 transition-colors hover:bg-red-50 hover:text-red-600 dark:bg-gray-900 dark:ring-gray-700 dark:hover:bg-red-950/50"
        title="Delete product"
        @click.stop="confirmDelete"
      >
        <Icon name="ph:trash" class="h-4 w-4" />
      </button>

      <button
        class="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-md ring-1 ring-gray-200 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white dark:bg-gray-900 dark:ring-gray-700"
        title="Edit product (coming soon)"
        @click.stop="navigateToEdit"
      >
        <Icon name="ph:pencil-simple" class="h-4 w-4" />
      </button>
    </div>
    <div class="flex h-full flex-col justify-between space-y-4">
      <div class="space-y-2">
        <h3
          class="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
        >
          {{ product.title }}
        </h3>
        <p class="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {{ product.description }}
        </p>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400"
            >Price</span
          >
          <span
            class="text-lg font-bold text-primary-600 dark:text-primary-400"
          >
            ${{ product.purchasePrice }}
          </span>
        </div>
        <div class="flex flex-col text-right">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400"
            >Rent</span
          >
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
            ${{ product.rentPrice }} / {{ product.rentalPeriod }}
          </span>
        </div>
      </div>

      <div class="pt-2">
        <span
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="PRODUCT_STATUS_CLASSES[product.status]"
        >
          {{ product.status }}
        </span>
      </div>
    </div>

    <UiAlertDialog v-model:open="showDeleteDialog">
      <UiAlertDialogContent>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>Delete this product?</UiAlertDialogTitle>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel @click="showDeleteDialog = false">
            Cancel
          </UiAlertDialogCancel>
          <UiAlertDialogAction variant="destructive" as-child>
            <UiButton @click="handleDelete">Delete</UiButton>
          </UiAlertDialogAction>
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </div>
</template>
