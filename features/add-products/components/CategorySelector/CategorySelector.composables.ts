import type { Ref } from "vue";
import { AVAILABLE_CATEGORIES } from "~/common/utils/constants";

export const useCategorySelector = (categories: Ref<string[]>) => {
  const MAX_CATEGORIES = 10;

  const isValidCategory = (
    category: string,
  ): category is (typeof AVAILABLE_CATEGORIES)[number] => {
    return AVAILABLE_CATEGORIES.includes(
      category as (typeof AVAILABLE_CATEGORIES)[number],
    );
  };

  const toggleCategory = (category: string) => {
    if (!isValidCategory(category)) return;

    const index = categories.value.indexOf(category);

    if (index > -1) {
      categories.value = categories.value.filter((_, i) => i !== index);
    } else {
      if (categories.value.length < MAX_CATEGORIES) {
        categories.value = [...categories.value, category];
      }
    }
  };

  const isAtMaxLimit = computed(
    () => categories.value.length >= MAX_CATEGORIES,
  );

  const isCategoryDisabled = (category: string): boolean => {
    return !categories.value.includes(category) && isAtMaxLimit.value;
  };

  return {
    toggleCategory,
    isAtMaxLimit,
    isCategoryDisabled,
    MAX_CATEGORIES,
  };
};
