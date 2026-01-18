<script setup lang="ts">
import { AVAILABLE_CATEGORIES } from "~/common/utils/constants";

const props = defineProps<{
  categories: string[];
}>();

const emit = defineEmits<{
  (e: "update:categories", value: string[]): void;
}>();

const MAX_CATEGORIES = 10;

const toggleCategory = (category: string) => {
  const index = props.categories.indexOf(category);
  let newCategories: string[];

  if (index > -1) {
    newCategories = props.categories.filter((_, i) => i !== index);
  } else {
    if (props.categories.length < MAX_CATEGORIES) {
      newCategories = [...props.categories, category];
    } else {
      return;
    }
  }

  emit("update:categories", newCategories);
};

const isCategorySelected = (category: string): boolean => {
  return props.categories.includes(category);
};

const isCategoryDisabled = (category: string): boolean => {
  return !props.categories.includes(category) && props.categories.length >= MAX_CATEGORIES;
};
</script>

<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between">
      <UiLabel>Categories</UiLabel>
      <p class="text-xs text-muted-foreground">
        {{ props.categories.length }}/{{ MAX_CATEGORIES }} selected
      </p>
    </div>

    <div class="flex flex-wrap gap-3">
      <div
        v-for="category in AVAILABLE_CATEGORIES"
        :key="category"
        class="flex flex-row items-center space-x-2"
      >
        <div class="flex flex-row items-center space-x-2 cursor-pointer" @click="toggleCategory(category)">
          <UiCheckbox
            :id="category"
            :checked="isCategorySelected(category)"
            :disabled="isCategoryDisabled(category)"
          />
          <UiLabel
            :for="category"
            class="font-normal cursor-pointer text-sm"
            :class="{
              'text-muted-foreground': isCategoryDisabled(category),
            }"
            @click.stop
          >
            {{ category }}
          </UiLabel>
        </div>
      </div>
    </div>

    <p
      v-if="props.categories.length >= MAX_CATEGORIES"
      class="text-xs text-muted-foreground"
    >
      Maximum categories reached. Remove some to select others.
    </p>
  </div>
</template>
