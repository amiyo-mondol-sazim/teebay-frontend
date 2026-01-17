<script setup lang="ts">
import { useCategoryInput } from "./CategoryInput.composables";

const props = defineProps<{
  categories: string[];
}>();

const emit = defineEmits<{
  (e: "update:categories", value: string[]): void;
}>();

const categories = computed({
  get: () => props.categories,
  set: (value) => emit("update:categories", value),
});

const categoryInput = ref("");

const { addCategory, removeCategory, MAX_CATEGORIES } =
  useCategoryInput(categories);

const handleAddCategory = () => {
  const result = addCategory(categoryInput.value);
  categoryInput.value = result;
};
</script>

<template>
  <div class="space-y-3">
    <!-- Display tags -->
    <div v-if="categories.length > 0" class="flex flex-wrap gap-2">
      <UiBadge
        v-for="(category, index) in categories"
        :key="index"
        variant="secondary"
        class="gap-1 pr-1"
      >
        {{ category }}
        <button
          type="button"
          class="ml-1 rounded-full hover:bg-destructive/20 p-0.5"
          :aria-label="`Remove ${category}`"
          @click="removeCategory(index)"
        >
          <Icon name="ph:x" class="h-3 w-3" />
        </button>
      </UiBadge>
    </div>

    <!-- Input field with add button -->
    <div class="flex items-center gap-2">
      <FormTextfield
        v-model="categoryInput"
        label="Categories"
        name="categoryInput"
        type="text"
        placeholder="Type category and press Enter"
        class="flex-1"
        @keydown.enter.prevent="handleAddCategory"
      />
      <UiButton
        type="button"
        variant="outline"
        :disabled="!categoryInput.trim() || categories.length >= MAX_CATEGORIES"
        class="mt-2"
        @click="handleAddCategory"
      >
        <Icon name="ph:plus" class="h-6 w-6" />
      </UiButton>
    </div>

    <!-- Helper text -->
    <p class="text-xs text-muted-foreground">
      {{ categories.length }}/{{ MAX_CATEGORIES }} categories
    </p>
  </div>
</template>
