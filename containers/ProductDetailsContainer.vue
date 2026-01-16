<script setup lang="ts">
import { computed, onMounted, ref, toRef } from "vue";

import { useUserQuery } from "~/common/api/auth/auth.queries";
import { useIncrementViewsMutation } from "~/common/api/products/products.mutations";
import { useProductDetailQuery } from "~/common/api/products/products.queries";
import { useCreateRentMutation } from "~/common/api/rents/mutations";
import { useBuyProductMutation } from "~/common/api/sales/mutations";

import BuyConfirmationModal from "~/common/components/ProductDetails/BuyConfirmationModal.vue";
import ProductDetailsCard from "~/common/components/ProductDetails/ProductDetailsCard.vue";
import RentDatePickerModal from "~/common/components/ProductDetails/RentDatePickerModal.vue";

interface Props {
  productId: number;
}

const props = defineProps<Props>();

// Data fetching
const {
  data: product,
  isLoading,
  isError,
  error,
} = useProductDetailQuery(toRef(props, "productId"));

// Mutations
const buyMutation = useBuyProductMutation();
const rentMutation = useCreateRentMutation();
const incrementViewsMutation = useIncrementViewsMutation();

// Increment views on mount
onMounted(() => {
  if (props.productId) {
    incrementViewsMutation.mutate(props.productId);
  }
});

// Check if current user owns the product
const { data: user } = useUserQuery();
const isOwnProduct = computed(
  () => product.value?.owner?.id === user.value?.id
);

// Computed for pending states
const isBuying = computed(() => buyMutation.isPending.value);
const isRenting = computed(() => rentMutation.isPending.value);

// Modals
const buyModalOpen = ref(false);
const rentModalOpen = ref(false);

// Handlers
const handleBuy = () => {
  buyModalOpen.value = true;
};

const handleRent = () => {
  rentModalOpen.value = true;
};

const handleBuyConfirm = () => {
  if (product.value) {
    buyMutation.mutate(product.value.id);
    buyModalOpen.value = false;
  }
};

const handleBuyCancel = () => {
  buyModalOpen.value = false;
};

const handleRentConfirm = (dates: { startDate: string; endDate: string }) => {
  if (product.value) {
    rentMutation.mutate({
      productId: product.value.id,
      startDate: dates.startDate,
      endDate: dates.endDate,
    });
    rentModalOpen.value = false;
  }
};

const handleRentCancel = () => {
  rentModalOpen.value = false;
};
</script>

<template>
  <div v-if="isLoading">
    <!-- Loading skeleton -->
    <UiSkeleton class="h-96 w-full" />
  </div>

  <div v-else-if="isError">
    <!-- Error state -->
    <div class="text-center">
      <p class="text-destructive">
        Failed to load product: {{ error?.message }}
      </p>
      <UiButton @click="$router.go(0)">Retry</UiButton>
    </div>
  </div>

  <div v-else-if="product">
    <ProductDetailsCard
      :product="product"
      :on-buy="handleBuy"
      :on-rent="handleRent"
      :is-buying="isBuying"
      :is-renting="isRenting"
      :is-own-product="isOwnProduct"
    />

    <BuyConfirmationModal
      :product="product"
      :open="buyModalOpen"
      :is-loading="isBuying"
      @confirm="handleBuyConfirm"
      @cancel="handleBuyCancel"
    />

    <RentDatePickerModal
      :product="product"
      :open="rentModalOpen"
      :is-loading="isRenting"
      @confirm="handleRentConfirm"
      @cancel="handleRentCancel"
    />
  </div>
</template>
