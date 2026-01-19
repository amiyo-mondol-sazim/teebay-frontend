export const loadMoreTrigger = ref<HTMLElement | null>(null);
export const setLoadMoreTrigger = (ref: Element | ComponentPublicInstance | null) => {
  loadMoreTrigger.value = ref as HTMLElement | null;
};
