import { MAX_CATEGORIES } from "./CategorySelector.constants";

export function toggleCategory(
  categories: string[],
  category: string
): string[] | null {
  const index = categories.indexOf(category);

  if (index > -1) {
    return categories.filter((_, i) => i !== index);
  }

  if (categories.length < MAX_CATEGORIES) {
    return [...categories, category];
  }

  return null;
}

export function isCategorySelected(
  categories: string[],
  category: string
): boolean {
  return categories.includes(category);
}

export function isCategoryDisabled(
  categories: string[],
  category: string
): boolean {
  return (
    !categories.includes(category) && categories.length >= MAX_CATEGORIES
  );
}
