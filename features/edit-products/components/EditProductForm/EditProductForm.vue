<script lang="ts" setup>
import { useEditProductForm } from "./EditProductForm.composables";
import { rentalPeriodOptions } from "./EditProductForm.constants";
import type { TGetPresignedUrlInput } from "~/common/api/file-uploads/file-uploads.mutations";
import { handleFileUpdate } from "~/features/add-products/components/Step1ImageUpload/Step1ImageUpload.helpers";
import type { Step1Emits } from "~/features/add-products/components/Step1ImageUpload/Step1ImageUpload.types";

const props = defineProps<{
  productId: number;
}>();

const {
  data: product,
  isLoading: isLoadingProduct,
  isError: isProductError,
  error: productError,
} = useProductDetailQuery(computed(() => props.productId));

const { data: currentUser, isLoading: isLoadingUser } = useUserQuery();

const isOwner = computed(() => {
  if (!product.value || !currentUser.value) return false;
  return product.value.owner?.id === currentUser.value.id;
});

const mutation = useUpdateProductMutation();

const form = useEditProductForm();

const categories = ref<string[]>([]);

const getPresignedUrlMutation = useGetPresignedUrlMutation();
const uploadFileMutation = useUploadFileMutation();

const selectedFile = ref<File | { id: number; image_url?: string } | null>(null);

watch(
  () => product.value,
  (newProduct) => {
    if (newProduct) {
      form.setValues({
        title: newProduct.title,
        description: newProduct.description,
        categories: newProduct.categories,
        purchasePrice: newProduct.purchasePrice,
        rentPrice: newProduct.rentPrice,
        rentalPeriod: newProduct.rentalPeriod,
        imageUrl: newProduct.imageUrl,
      });
      categories.value = newProduct.categories;
      selectedFile.value = newProduct.imageUrl
        ? { id: 0, image_url: newProduct.imageUrl }
        : null;
    }
  },
  { immediate: true }
);

watch(
  categories,
  (newCategories) => {
    form.setFieldValue("categories", newCategories);
  },
  { deep: true }
);

const onSubmit = form.handleSubmit((values) => {
  mutation.mutate({ id: props.productId, data: values });
});

const handleUpload = async (file: File | null) => {
  await handleFileUpdate(
    file,
    selectedFile,
    ((event: "update" | "next", value?: string) => {
      if (event === "update" && value) {
        form.setFieldValue("imageUrl", value);
      }
    }) as Step1Emits,
    (input: TGetPresignedUrlInput) => getPresignedUrlMutation.mutateAsync(input),
    (input: { url: string; file: File }) => uploadFileMutation.mutateAsync(input)
  );
};

const onCancel = () => {
  navigateTo(`/products/${props.productId}`);
};
</script>

<template>
  <div class="container mx-auto min-h-screen px-4 py-8">
    <div
      v-if="isLoadingProduct || isLoadingUser"
      class="flex min-h-[25rem] items-center justify-center"
    >
      <div class="flex items-center gap-3 text-muted-foreground">
        <Icon name="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
        <span class="text-sm">Loading product...</span>
      </div>
    </div>

    <div
      v-else-if="isProductError"
      class="mx-auto max-w-md rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center"
    >
      <div class="mb-4 flex justify-center">
        <div
          class="flex h-16 w-16 items-center justify-center rounded-xl bg-destructive/10"
        >
          <Icon name="ph:warning-circle" class="h-8 w-8 text-destructive" />
        </div>
      </div>
      <h2 class="mb-2 text-xl font-semibold text-destructive">
        Failed to load product
      </h2>
      <p class="mb-6 text-sm text-muted-foreground">
        {{ productError?.message || "An unexpected error occurred" }}
      </p>
      <UiButton variant="outline" @click="$router.go(0)">
        <Icon name="ph:arrow-counter-clockwise" class="mr-2 h-4 w-4" />
        Retry
      </UiButton>
    </div>

    <div
      v-else-if="!isOwner"
      class="mx-auto max-w-md rounded-xl border border-dashed border-muted-foreground/25 bg-muted/30 p-12 text-center"
    >
      <div class="mb-6 flex justify-center">
        <div
          class="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10"
        >
          <Icon name="ph:lock-key" class="h-10 w-10 text-primary" />
        </div>
      </div>
      <h2 class="mb-3 text-2xl font-bold text-foreground">Access Denied</h2>
      <p class="mb-8 text-muted-foreground">
        You don't have permission to edit this product. It belongs to another
        user.
      </p>
      <div class="flex justify-center gap-3">
        <UiButton variant="outline" @click="$router.back()">
          <Icon name="ph:arrow-left" class="mr-2 h-4 w-4" />
          Go Back
        </UiButton>
        <UiButton @click="$router.push('/my-products')">
          <Icon name="ph:package" class="mr-2 h-4 w-4" />
          My Products
        </UiButton>
      </div>
    </div>

    <div v-else class="mx-auto max-w-3xl">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">Edit Product</h1>
        <p class="mt-2 text-muted-foreground">
          Make changes to your product listing.
        </p>
      </div>

      <UiCard class="w-full">
        <form @submit.prevent="onSubmit">
          <UiCardContent class="space-y-6 pt-6">
            <DndImageUpload
              :model-value="selectedFile"
              :accept="['image/png', 'image/jpeg', 'image/jpg', 'image/webp']"
              :max-file-size="5 * 1024 * 1024"
              @update:model-value="handleUpload"
            />

            <FormTextfield
              label="Title"
              name="title"
              type="text"
              placeholder="Product title"
            />

            <FormTextarea
              label="Description"
              name="description"
              placeholder="Describe your product..."
              :rows="4"
              :max-length="1000"
            />

            <CategorySelector v-model:categories="categories" />

            <div class="grid grid-cols-2 gap-4">
              <FormTextfield
                label="Purchase Price ($)"
                name="purchasePrice"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
              />
              <FormTextfield
                label="Rent Price ($)"
                name="rentPrice"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
              />
            </div>

            <FormSelect
              label="Rental Period"
              name="rentalPeriod"
              placeholder="Select rental period"
              :options="rentalPeriodOptions"
            />
          </UiCardContent>

          <UiCardFooter class="flex justify-end gap-3">
            <UiButton type="button" variant="outline" @click="onCancel">
              Cancel
            </UiButton>
            <UiButton type="submit" :disabled="mutation.isPending.value">
              <Icon
                v-if="!mutation.isPending.value"
                name="ph:pencil-simple"
                class="mr-2 h-4 w-4"
              />
              {{ mutation.isPending.value ? "Updating..." : "Update Product" }}
            </UiButton>
          </UiCardFooter>
        </form>
      </UiCard>
    </div>
  </div>
</template>
