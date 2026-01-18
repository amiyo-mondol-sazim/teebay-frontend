import type { Ref } from "vue";

export const useCategoryInput = (categories: Ref<string[]>) => {
  const MAX_CATEGORIES = 10;

  const addCategory = (value: string) => {
    const trimmed = value.trim();
    if (
      !trimmed ||
      categories.value.includes(trimmed) ||
      categories.value.length >= MAX_CATEGORIES
    ) {
      return trimmed;
    }
    categories.value.push(trimmed);
    return "";
  };

  const removeCategory = (index: number) => {
    categories.value.splice(index, 1);
  };

  return {
    addCategory,
    removeCategory,
    MAX_CATEGORIES,
  };
};
