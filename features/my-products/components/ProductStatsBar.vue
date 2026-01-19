<script setup lang="ts">
import { useProductStats } from "./MyProducts.composables";

const props = defineProps<{
  products: TProductResponse[];
}>();

const { statItems } = useProductStats(() => props.products);
</script>

<template>
  <div
    class="glass-panel rounded-2xl p-6 shadow-lg shadow-primary/5 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
  >
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <div
        v-for="(stat, index) in statItems"
        :key="stat.label"
        class="flex flex-col items-center gap-2"
        :style="{
          animation: `fade-in-up 0.5s ease-out ${index * 0.1}s both`,
        }"
      >
        <div
          :class="[
            'flex h-12 w-12 items-center justify-center rounded-xl',
            stat.bgColor,
          ]"
        >
          <Icon :name="stat.icon" :class="['h-6 w-6', stat.color]" />
        </div>
        <div class="text-center">
          <p
            :class="[
              'text-2xl font-bold tracking-tight',
              stat.color,
              'font-serif',
            ]"
          >
            {{ stat.value }}
          </p>
          <p class="text-xs font-medium text-muted-foreground">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
