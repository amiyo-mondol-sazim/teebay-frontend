import type { ComputedRef, Ref } from "vue";
import { computed, ref } from "vue";
import type { TProductStatus } from "~/common/typedefs/query.ts";
import type { TProductStatusFilter } from "~/features/all-products/AllProducts.types";

type ApiQueryParams = {
  status?: TProductStatus;
  categories?: string;
};

interface UseProductFiltersReturn {
  status: Ref<TProductStatusFilter>;
  categories: Ref<string[]>;
  activeFilterCount: ComputedRef<number>;
  queryParams: ComputedRef<ApiQueryParams>;

  setStatus: (value: TProductStatusFilter) => void;
  setCategories: (value: string[]) => void;
  clearAll: () => void;
}

export function useProductFilters(): UseProductFiltersReturn {
  const status = ref<TProductStatusFilter>("ALL");
  const categories = ref<string[]>([]);

  const activeFilterCount = computed(() => {
    let count = 0;
    if (status.value !== "ALL") count++;
    count += categories.value.length;
    return count;
  });

  const queryParams = computed<ApiQueryParams>(() => ({
    ...(status.value !== "ALL" && { status: status.value as TProductStatus }),
    ...(categories.value.length && { categories: categories.value.join(",") }),
  }));

  const setStatus = (value: TProductStatusFilter) => {
    status.value = value;
  };

  const setCategories = (value: string[]) => {
    categories.value = value;
  };

  const clearAll = () => {
    status.value = "ALL";
    categories.value = [];
  };

  return {
    status,
    categories,
    activeFilterCount,
    queryParams,
    setStatus,
    setCategories,
    clearAll,
  };
}
