<script setup lang="ts">
import type { components } from "~/common/typedefs/api-schema";
import { PRODUCT_STATUS_CLASSES } from "./products.helper";

interface Props {
  product: components["schemas"]["ProductResponse"];
}

const props = defineProps<Props>();

const router = useRouter();

const navigateToDetail = () => {
  router.push(`/products/${props.product.id}`);
};
</script>

<template>
  <div
    class="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
    @click="navigateToDetail"
  >
    <div class="flex h-full flex-col justify-between space-y-4">
      <div class="space-y-2">
        <h3
          class="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-gray-50"
        >
          {{ product.title }}
        </h3>
        <p class="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {{ product.description }}
        </p>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400"
            >Price</span
          >
          <span
            class="text-lg font-bold text-primary-600 dark:text-primary-400"
          >
            ${{ product.purchasePrice }}
          </span>
        </div>
        <div class="flex flex-col text-right">
          <span class="text-xs font-medium text-gray-500 dark:text-gray-400"
            >Rent</span
          >
          <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
            ${{ product.rentPrice }} / {{ product.rentalPeriod }}
          </span>
        </div>
      </div>

      <div class="pt-2">
        <span
          class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="PRODUCT_STATUS_CLASSES[product.status]"
        >
          {{ product.status }}
        </span>
      </div>
    </div>
  </div>
</template>
