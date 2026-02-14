<script setup lang="ts">
import { isProductSoldOrOwned } from "./ProductDetails.helper";

interface Props {
  onBuy: () => void;
  onRent: () => void;
  onMessage: () => void;
  isBuying?: boolean;
  isRenting?: boolean;
  isMessaging?: boolean;
  isOwnProduct?: boolean;
  productStatus: EProductStatus;
}

const props = withDefaults(defineProps<Props>(), {
  isBuying: false,
  isRenting: false,
  isMessaging: false,
  isOwnProduct: false,
});

const isDisabled = computed(() =>
  isProductSoldOrOwned(props.productStatus, props.isOwnProduct),
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

    <UiButton
      variant="outline"
      :loading="isMessaging"
      class="flex-1 transition-transform duration-200 hover:scale-105"
      @click="onMessage"
    >
      <Icon name="heroicons:chat-bubble-left" class="mr-2 h-4 w-4" />
      Message Owner
    </UiButton>
  </div>
</template>
