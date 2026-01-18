<script setup lang="ts">
import { PRODUCT_STATUS_CLASSES } from "~/common/components/products/products.helper";
import type { TProductResponse } from "~/common/typedefs/query";
import { FORMAT_CREATED_DATE } from "../../../features/product-details/product-details.helper";

interface Props {
  product: TProductResponse;
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
</script>

<template>
  <div
    class="hover-card rounded-xl bg-card p-6 shadow-lg transition-all duration-200"
  >
    <div class="grid gap-6 md:grid-cols-2 items-start">
      <div
        class="aspect-video rounded-lg bg-muted flex items-center justify-center md:sticky md:top-6 md:self-stretch md:aspect-auto"
      >
        <span class="text-muted-foreground">Image Placeholder</span>
      </div>

      <div class="flex flex-col h-full">
        <div class="space-y-4 shrink-0">
          <div>
            <h1 class="font-serif text-2xl font-bold text-primary">
              {{ product.title }}
            </h1>
            <p class="mt-2 text-muted-foreground">{{ product.description }}</p>
          </div>

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

          <UiBadge :class="PRODUCT_STATUS_CLASSES[product.status]">
            {{ product.status }}
          </UiBadge>

          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="heroicons:eye" class="h-4 w-4" />
            <span>{{ product.viewCount }} views</span>
          </div>

          <div class="flex items-center gap-2 text-muted-foreground">
            <Icon name="heroicons:calendar" class="h-4 w-4" />
            <span>Created on {{ FORMAT_CREATED_DATE(product.createdAt) }}</span>
          </div>

          <ProductPriceDisplay :product="product" />
        </div>

        <div class="shrink-0">
          <PreviousRentalsContainer :product-id="product.id" />
        </div>

        <div class="shrink-0 mt-4">
          <ProductActionButtons
            :on-buy="onBuy"
            :on-rent="onRent"
            :is-buying="props.isBuying"
            :is-renting="props.isRenting"
            :is-own-product="props.isOwnProduct"
            :product-status="product.status as EProductStatus"
          />
        </div>
      </div>
    </div>
  </div>
</template>
