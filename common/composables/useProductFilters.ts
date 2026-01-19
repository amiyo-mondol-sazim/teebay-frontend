import type { ComputedRef, Ref } from "vue";
import { computed, ref } from "vue";
import type { TProductStatus } from "~/common/typedefs/api";
import { EProductStatusFilter } from "~/common/utils/constants";

type ApiQueryParams = {
  status?: TProductStatus;
  categories?: string;
};

interface UseProductFiltersReturn {
  status: Ref<EProductStatusFilter>;
  categories: Ref<string[]>;
  activeFilterCount: ComputedRef<number>;
  queryParams: ComputedRef<ApiQueryParams>;

  setStatus: (value: EProductStatusFilter) => void;
  setCategories: (value: string[]) => void;
  clearAll: () => void;
}

export function useProductFilters(): UseProductFiltersReturn {
  const status = ref<EProductStatusFilter>(EProductStatusFilter.ALL);
  const categories = ref<string[]>([]);

  const activeFilterCount = computed(() => {
    let count = 0;
    if (status.value !== EProductStatusFilter.ALL) count++;
    count += categories.value.length;
    return count;
  });

  const queryParams = computed<ApiQueryParams>(() => ({
    ...(status.value !== EProductStatusFilter.ALL && { status: status.value as TProductStatus }),
    ...(categories.value.length && { categories: categories.value.join(",") }),
  }));

  const setStatus = (value: EProductStatusFilter) => {
    status.value = value;
  };

  const setCategories = (value: string[]) => {
    categories.value = value;
  };

  const clearAll = () => {
    status.value = EProductStatusFilter.ALL;
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
