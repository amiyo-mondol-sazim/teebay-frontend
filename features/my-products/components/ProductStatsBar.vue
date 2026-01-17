<script setup lang="ts">
import type { TProductResponse } from "~/common/typedefs/query";

const props = defineProps<{
  products: TProductResponse[];
}>();

const stats = computed(() => {
  const products = props.products || [];
  return {
    total: products.length,
    available: products.filter((p) => p.status === "AVAILABLE").length,
    rented: products.filter((p) => p.status === "RENTED").length,
    sold: products.filter((p) => p.status === "SOLD").length,
  };
});

const statItems = computed(() => [
  {
    label: "Total",
    value: stats.value.total,
    icon: "ph:package",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    label: "Available",
    value: stats.value.available,
    icon: "ph:check-circle",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    label: "Rented",
    value: stats.value.rented,
    icon: "ph:clock",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    label: "Sold",
    value: stats.value.sold,
    icon: "ph:currency-dollar",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
]);
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
