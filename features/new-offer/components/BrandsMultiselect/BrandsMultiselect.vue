<script setup lang="ts">
import { debouncedRef, useIntersectionObserver } from '@vueuse/core';
import { useField } from 'vee-validate';
import { MIN_SEARCH_LENGTH, OPTION_HEIGHT_PIXELS } from './BrandsMultiselect.constants';
import type { TBrandOption } from './BrandsMultiselect.types';

const props = defineProps<{ name: string }>();

const searchTermInput = ref('');
const searchTerm = debouncedRef(searchTermInput, 300);
const selectedOptions = ref<TBrandOption[]>([]);

const {
  data: brands,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
} = useBrandsInfiniteQuery({ search: searchTerm, minSearchLength: MIN_SEARCH_LENGTH });

const field = useField<Array<TBrandOption>>(props.name);

const options = computed(() => brands.value ?? []);
const unSelectedOptions = computed(() => {
  const selectedValueSet = new Set(selectedOptions.value.map((item) => item.id));
  return options.value.filter((option) => !selectedValueSet.has(option.id));
});

const target = useTemplateRef<HTMLDivElement>('target');
useIntersectionObserver(target, ([entry]) => {
  if (entry?.isIntersecting) fetchNextPage();
});

watch(
  selectedOptions,
  (newVal) => {
    const hasNewOptions = newVal.some((item) => !field.value.value?.some((v) => v.id === item.id));
    if (hasNewOptions) {
      field.setValue(newVal);
    }
  },
  { deep: true },
);

watch(
  field.value,
  (newVal) => {
    const hasNewOptions = newVal.some((item) => !selectedOptions.value.some((v) => v.id === item.id));
    if (hasNewOptions) {
      selectedOptions.value = newVal;
    }
  },
  { deep: true, immediate: true },
);

const handleSelect = (val: TBrandOption) => {
  selectedOptions.value.push({ ...val });
  searchTermInput.value = '';
};
</script>

<template>
  <div>
    <UiLabel class="pb-3.5">Select Brand(s)</UiLabel>
    <UiCombobox class="w-full" ignore-filter>
      <UiComboboxAnchor class="min-h-10.5 gap-0 px-0 py-0" as-child>
        <UiTagsInput
          v-model="selectedOptions"
          class="grounded-sm w-full bg-white placeholder:text-sm [&>[data-slot='command-input-wrapper']]:flex-1"
        >
          <div class="flex flex-wrap items-center gap-2">
            <UiTagsInputItem
              v-for="item in selectedOptions"
              :key="item.id"
              :value="item"
              class="bg-primary/10 border-primary/60 h-6.5 gap-1 border-[0.5px] pl-2 text-xs leading-none first:ml-2"
            >
              <span>{{ item.name }}</span>
              <UiTagsInputItemDelete />
            </UiTagsInputItem>
          </div>
          <UiComboboxInput v-model="searchTermInput" as-child class="text-base placeholder:text-base">
            <UiTagsInputInput class="placeholder:text-sm" placeholder="Search brands" @keydown.enter.prevent />
          </UiComboboxInput>
        </UiTagsInput>
      </UiComboboxAnchor>

      <UiComboboxList
        align="start"
        class="max-h-(--reka-combobox-content-available-height) w-(--reka-popper-anchor-width) overflow-hidden rounded-sm"
        @focus-outside.prevent
      >
        <UiComboboxEmpty>
          <div v-if="isLoading" class="flex flex-col gap-1 px-6">
            <UiSkeleton v-for="i in 5" :key="i" :style="{ height: `${OPTION_HEIGHT_PIXELS}px` }" />
          </div>
          <span v-else-if="searchTerm.trim().length >= MIN_SEARCH_LENGTH" class="text-gray-400"> No options </span>
          <span v-else class="text-gray-400">
            {{ `Type at least ${MIN_SEARCH_LENGTH} characters to search` }}
          </span>
        </UiComboboxEmpty>
        <UiComboboxViewport>
          <UiComboboxVirtualizer
            v-slot="{ option }"
            :options="unSelectedOptions"
            :text-content="(v: TBrandOption) => v?.name"
            :estimate-size="OPTION_HEIGHT_PIXELS"
          >
            <UiComboboxItem
              :value="option"
              class="w-full truncate rounded-sm text-base"
              :style="{ height: `${OPTION_HEIGHT_PIXELS}px` }"
              @select="handleSelect(option)"
            >
              {{ option.name }}
            </UiComboboxItem>
          </UiComboboxVirtualizer>
          <div ref="target">
            <UiSkeleton
              v-if="hasNextPage || isFetchingNextPage"
              class="h-full"
              :style="{ height: `${OPTION_HEIGHT_PIXELS}px` }"
            />
          </div>
        </UiComboboxViewport>
      </UiComboboxList>
    </UiCombobox>
    <p v-if="field.errorMessage" class="text-destructive text-xs leading-none [&:not(:empty)]:pt-2">
      {{ field.errorMessage }}
    </p>
  </div>
</template>
