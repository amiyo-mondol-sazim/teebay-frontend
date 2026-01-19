<script setup lang="ts">
import { AVAILABLE_CATEGORIES } from "~/common/utils/constants";
import { MAX_CATEGORIES } from "./CategorySelector.constants";
import {
  isCategoryDisabled,
  isCategorySelected,
  toggleCategory,
} from "./CategorySelector.helpers";

const props = defineProps<{
  categories: string[];
}>();

const emit = defineEmits<{
  (e: "update:categories", value: string[]): void;
}>();

const handleToggleCategory = (category: string) => {
  const newCategories = toggleCategory(props.categories, category);
  if (newCategories !== null) {
    emit("update:categories", newCategories);
  }
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
        <div
          class="flex flex-row items-center space-x-2 cursor-pointer"
          @click="handleToggleCategory(category)"
        >
          <UiCheckbox
            :id="category"
            :checked="isCategorySelected(props.categories, category)"
            :disabled="isCategoryDisabled(props.categories, category)"
          />
          <UiLabel
            :for="category"
            class="font-normal cursor-pointer text-sm"
            :class="{
              'text-muted-foreground': isCategoryDisabled(props.categories, category),
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
