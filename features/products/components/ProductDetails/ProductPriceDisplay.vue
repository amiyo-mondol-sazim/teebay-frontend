<script setup lang="ts">
import type { components } from "~/common/typedefs/api-schema";

interface Props {
  product: components["schemas"]["ProductResponse"];
}

defineProps<Props>();
</script>

<template>
  <div class="glass-panel rounded-lg p-4">
    <div
      class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      <div class="text-center md:text-left">
        <p class="text-sm text-muted-foreground">Purchase Price</p>
        <p class="text-3xl font-bold text-primary">
          ${{ product.purchasePrice }}
        </p>
      </div>

      <div class="hidden h-12 w-px bg-border md:block"></div>
      <div class="h-px w-full bg-border md:hidden"></div>

      <div class="text-center md:text-right">
        <p class="text-sm text-muted-foreground">Rent Price</p>
        <p class="text-lg font-semibold text-muted-foreground">
          ${{ product.rentPrice }}/{{ product.rentalPeriod }}
        </p>
      </div>
    </div>
  </div>
</template>
