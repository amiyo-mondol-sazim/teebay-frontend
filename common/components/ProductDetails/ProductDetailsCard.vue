<script setup lang="ts">
import { computed } from "vue";

import dayjs from "dayjs";

import type { components } from "~/common/typedefs/api-schema";

import { PRODUCT_STATUS_CLASSES } from "~/features/products/components/Product/products.helper";

import ProductActionButtons from "./ProductActionButtons.vue";
import ProductPriceDisplay from "./ProductPriceDisplay.vue";

interface Props {
  product: components["schemas"]["ProductResponse"];
  onBuy: () => void;
  onRent: () => void;
  isBuying?: boolean;
  isRenting?: boolean;
  isOwnProduct?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isBuying: false,
  isRenting: false,
  isOwnProduct: false,
});

const formattedCreatedDate = computed(() =>
  dayjs(props.product.createdAt).format("MMM DD, YYYY")
);
</script>

<template>
  <div
    class="hover-card rounded-xl bg-card p-6 shadow-lg transition-all duration-200"
  >
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Image Placeholder -->
      <div
        class="aspect-square rounded-lg bg-muted flex items-center justify-center"
      >
        <span class="text-muted-foreground">Image Placeholder</span>
      </div>

      <!-- Details -->
      <div class="space-y-4">
        <div>
          <h1 class="font-serif text-2xl font-bold text-primary">
            {{ product.title }}
          </h1>
          <p class="mt-2 text-muted-foreground">{{ product.description }}</p>
        </div>

        <!-- Categories -->
        <div class="flex flex-wrap gap-2">
          <UiBadge
            v-for="(category, index) in product.categories"
            :key="index"
            variant="secondary"
            class="bg-primary/10 text-primary"
          >
            {{ category }}
          </UiBadge>
        </div>

        <!-- Status -->
        <UiBadge :class="PRODUCT_STATUS_CLASSES[product.status]">
          {{ product.status }}
        </UiBadge>

        <!-- View Count -->
        <div class="flex items-center gap-2 text-muted-foreground">
          <Icon name="heroicons:eye" class="h-4 w-4" />
          <span>{{ product.viewCount }} views</span>
        </div>

        <!-- Created Date -->
        <div class="flex items-center gap-2 text-muted-foreground">
          <Icon name="heroicons:calendar" class="h-4 w-4" />
          <span>Created on {{ formattedCreatedDate }}</span>
        </div>

        <!-- Price Display -->
        <ProductPriceDisplay :product="product" />

        <!-- Action Buttons -->
        <ProductActionButtons
          :on-buy="onBuy"
          :on-rent="onRent"
          :is-buying="isBuying"
          :is-renting="isRenting"
          :is-own-product="isOwnProduct"
          :product-status="product.status"
        />
      </div>
    </div>
  </div>
</template>
