<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const route = useRoute();
const productId = computed(() => Number(route.params.id));

const { data: product, isLoading, isError, error } = useProductDetailQuery(productId);
const { data: currentUser, isLoading: isLoadingUser } = useUserQuery();

const isOwner = computed(() => {
  if (!product.value || !currentUser.value) return false;
  return (product.value.owner)?.id === currentUser.value.id;
});
</script>

<template>
  <div class="container mx-auto min-h-screen px-4 py-8">
    <div v-if="isLoading || isLoadingUser" class="flex min-h-[400px] items-center justify-center">
      <div class="flex items-center gap-3 text-muted-foreground">
        <Icon name="heroicons:arrow-path" class="h-5 w-5 animate-spin" />
        <span class="text-sm">Loading product...</span>
      </div>
    </div>

    <div
      v-else-if="isError"
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
        {{ error?.message || "An unexpected error occurred" }}
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
        <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
          <Icon name="ph:lock-key" class="h-10 w-10 text-primary" />
        </div>
      </div>
      <h2 class="mb-3 text-2xl font-bold text-foreground">
        Access Denied
      </h2>
      <p class="mb-8 text-muted-foreground">
        You don't have permission to edit this product. It belongs to another user.
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

      <div class="rounded-xl border border-dashed border-muted-foreground/25 bg-muted/30 p-12 text-center">
        <div class="mb-6 flex justify-center">
          <div class="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <Icon name="ph:wrench" class="h-10 w-10 text-primary" />
          </div>
        </div>
        <h2 class="mb-3 text-xl font-semibold text-foreground">
          Edit Product Form
        </h2>
        <p class="mb-6 max-w-sm text-muted-foreground mx-auto">
          The edit product form will be implemented here. For now, you can view the product details.
        </p>
        <UiButton variant="outline" @click="$router.push(`/products/${productId}`)">
          <Icon name="ph:eye" class="mr-2 h-4 w-4" />
          View Product
        </UiButton>
      </div>
    </div>
  </div>
</template>
