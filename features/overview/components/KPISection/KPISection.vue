<script setup lang="ts">
import { ECurrency } from '~/common/typedefs/enums';

const { isLoading, data: insights } = useInsightsQuery();
</script>

<template>
  <div class="grid grid-cols-3 justify-start gap-5">
    <template v-if="isLoading">
      <KPICardSkeleton v-for="value in 3" :key="value" />
    </template>
    <template v-else-if="insights">
      <KPICard label="REVENUE GENERATED" :value="insights.total_revenue_generated ?? 0" :currency="ECurrency.AED" />
      <KPICard label="USERS ACQUIRED" :value="insights.total_redemptions ?? 0" />
      <KPICard label="BUDGET USED" :value="insights.total_budget_used ?? 0" :currency="ECurrency.AED" />
    </template>
    <template v-else>
      <p class="text-gray-400">No insights found</p>
    </template>
  </div>
</template>
