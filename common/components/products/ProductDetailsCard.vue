<script setup lang="ts">
import { PRODUCT_STATUS_CLASSES } from "./products.helper";

interface Props {
  product: TProductResponse;
  onBuy: () => void;
  onRent: () => void;
  onMessage: () => void;
  isBuying?: boolean;
  isRenting?: boolean;
  isMessaging?: boolean;
  isOwnProduct?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isBuying: false,
  isRenting: false,
  isMessaging: false,
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
        <NuxtImg
          v-if="product.imageUrl"
          :src="product.imageUrl"
          :alt="product.title"
          class="w-full h-full object-cover rounded-lg"
        />
        <span v-else class="text-muted-foreground">Image Placeholder</span>
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
            <span>Created on {{ formatDate(product.createdAt) }}</span>
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
            :on-message="onMessage"
            :is-buying="props.isBuying"
            :is-renting="props.isRenting"
            :is-messaging="props.isMessaging"
            :is-own-product="props.isOwnProduct"
            :product-status="product.status as EProductStatus"
          />
        </div>
      </div>
    </div>
  </div>
</template>
