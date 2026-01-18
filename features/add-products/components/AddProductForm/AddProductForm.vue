<script lang="ts" setup>
import type { TCreateProductInput } from "~/common/typedefs/products";
import { useAddProductForm } from "./AddProductForm.composables";

defineProps<{
  isPending?: boolean;
}>();

const rentalPeriodOptions = [
  { label: "Day", value: "DAY" },
  { label: "Week", value: "WEEK" },
  { label: "Month", value: "MONTH" },
];

const emit = defineEmits<{
  (e: "submit", values: TCreateProductInput): void;
  (e: "cancel"): void;
}>();

const form = useAddProductForm();

const categories = ref<string[]>([]);

watch(
  categories,
  (newCategories) => {
    form.setFieldValue("categories", newCategories);
  },
  { deep: true },
);

const onSubmit = form.handleSubmit((values) => {
  emit("submit", values);
});
</script>

<template>
  <UiCard class="w-full max-w-2xl">
    <UiCardHeader>
      <UiCardTitle class="text-2xl font-serif">Add New Product</UiCardTitle>
      <UiCardDescription>
        Fill in the details to list your product
      </UiCardDescription>
    </UiCardHeader>

    <form @submit.prevent="onSubmit">
      <UiCardContent class="space-y-6">
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
        <UiButton type="button" variant="outline" @click="emit('cancel')">
          Cancel
        </UiButton>
        <UiButton type="submit" :disabled="isPending">
          <Icon v-if="!isPending" name="ph:plus" class="mr-2 h-4 w-4" />
          {{ isPending ? "Creating..." : "Add Product" }}
        </UiButton>
      </UiCardFooter>
    </form>
  </UiCard>
</template>
