<script setup lang="ts">
import type { TProductStatusFilter } from "../AllProducts.types";


interface Props {
  status: TProductStatusFilter;
  categories: string[];
  activeFilterCount: number;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:status": [value: TProductStatusFilter];
  "update:categories": [value: string[]];
  "clear-all": [];
}>();

const handleCategoriesUpdate = (value: string[]) => {
  emit("update:categories", value);
};

</script>

<template>
  <div class="product-filters-panel space-y-4">
    <div
      class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
    >
      <ProductStatusFilter :model-value="status" @update:model-value="$emit('update:status', $event)" />

      <div class="flex flex-wrap items-center gap-3">
        <CategoryFilter
          :model-value="categories"
          @update:model-value="handleCategoriesUpdate"
        />
      </div>
    </div>

    <ActiveFiltersRail
      v-if="activeFilterCount > 0"
      :status="status"
      :categories="categories"
      @remove-status="$emit('update:status', 'ALL')"
      @remove-category="
        $emit('update:categories', categories.filter((c) => c !== $event))
      "
      @clear-all="$emit('clear-all')"
    />
  </div>
</template>
