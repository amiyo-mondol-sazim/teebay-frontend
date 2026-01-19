import type { TProductResponse } from "~/common/typedefs/api";
import { getProductDetailUrl, getProductEditUrl } from "~/common/components/products/products.helper";

export function useProductCardNavigation(product: MaybeRef<TProductResponse>) {
  const router = useRouter();

  const navigateToDetail = () => {
    const id = toValue(product).id;
    router.push(getProductDetailUrl(id));
  };

  const navigateToEdit = () => {
    const id = toValue(product).id;
    router.push(getProductEditUrl(id));
  };

  return {
    navigateToDetail,
    navigateToEdit,
  };
}

export function useProductDelete(productId: MaybeRef<number>) {
  const showDeleteDialog = ref(false);
  const deleteMutation = useDeleteProductMutation();

  const confirmDelete = () => {
    showDeleteDialog.value = true;
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(toValue(productId));
    showDeleteDialog.value = false;
  };

  const handleDeleteCancel = () => {
    showDeleteDialog.value = false;
  };

  return {
    showDeleteDialog,
    isDeleting: computed(() => deleteMutation.isPending.value),
    confirmDelete,
    handleDelete,
    handleDeleteCancel,
  };
}

export function useMobileDetection(breakpoint = 1024) {
  const isMobile = ref(false);

  onMounted(() => {
    isMobile.value = window.innerWidth < breakpoint;
  });

  return { isMobile };
}
