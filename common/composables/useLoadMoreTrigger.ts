export const useLoadMoreTrigger = () => {
  const loadMoreTrigger = ref<HTMLElement | null>(null);

  const setLoadMoreTrigger = (ref: Element | ComponentPublicInstance | null) => {
    loadMoreTrigger.value = ref as HTMLElement | null;
  };

  return { loadMoreTrigger, setLoadMoreTrigger };
};
