<script setup lang="ts">
import { computed } from "vue";

interface Props {
  onBuy: () => void;
  onRent: () => void;
  isBuying?: boolean;
  isRenting?: boolean;
  isOwnProduct?: boolean;
  productStatus: string;
}

const props = withDefaults(defineProps<Props>(), {
  isBuying: false,
  isRenting: false,
  isOwnProduct: false,
});

const isDisabled = computed(
  () =>
    props.productStatus === ProductStatus.SOLD ||
    props.productStatus === ProductStatus.RENTED ||
    props.isOwnProduct
);
</script>

<template>
  <div class="flex flex-col gap-3 sm:flex-row">
    <UiButton
      :disabled="isDisabled || isBuying"
      :loading="isBuying"
      class="flex-1 transition-transform duration-200 hover:scale-105"
      @click="onBuy"
    >
      <Icon name="heroicons:shopping-cart" class="mr-2 h-4 w-4" />
      Buy Now
    </UiButton>

    <UiButton
      variant="outline"
      :disabled="isDisabled || isRenting"
      :loading="isRenting"
      class="flex-1 transition-transform duration-200 hover:scale-105"
      @click="onRent"
    >
      <Icon name="heroicons:calendar" class="mr-2 h-4 w-4" />
      Rent
    </UiButton>
  </div>
</template>
