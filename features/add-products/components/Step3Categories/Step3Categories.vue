<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { addProductSchema } from "../../add-products.schemas";
import CategorySelector from "../CategorySelector/CategorySelector.vue";

const props = defineProps<{
  categories: string[];
}>();

const emit = defineEmits<{
  (e: "update", values: string[]): void;
  (e: "next" | "back"): void;
}>();

const schema = toTypedSchema(addProductSchema.pick({ categories: true }));

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    categories: props.categories,
  },
});

const [categoriesRef] = defineField("categories");

watch(categoriesRef, (newVals) => {
  emit("update", newVals || []);
});

const onNext = handleSubmit(() => {
  emit("next");
});
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="space-y-1">
      <h2 class="text-xl font-semibold text-gray-900">Categories</h2>
      <p class="text-sm text-gray-500">
        Select up to 10 categories that best describe your product.
      </p>
    </div>

    <form class="flex flex-col gap-6" @submit.prevent="onNext">
      <div class="space-y-2">
        <CategorySelector
          :categories="categoriesRef || []"
          @update:categories="categoriesRef = $event"
        />
        <p v-if="errors.categories" class="text-sm text-destructive">
          {{ errors.categories }}
        </p>
      </div>

      <div class="flex justify-between">
        <UiButton
          type="button"
          variant="outline"
          @click="emit('back')"
          class="cursor-pointer"
        >
          Back
        </UiButton>
        <UiButton type="submit" class="cursor-pointer"> Next </UiButton>
      </div>
    </form>
  </div>
</template>
