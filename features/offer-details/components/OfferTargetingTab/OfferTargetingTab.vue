<script setup lang="ts">
import type { TOfferDetails } from '~/common/typedefs/api';
import { ECurrency } from '~/common/typedefs/enums';

defineProps<{ offer: TOfferDetails }>();
</script>

<template>
  <div class="max-w-4xl space-y-10 px-2">
    <div class="space-y-2">
      <p class="text-gray-80 text-lg leading-none font-semibold">Total Offer Budget</p>
      <p class="text-lg font-semibold whitespace-pre-wrap text-gray-600">
        {{ offer.budget_limit ? formatCurrency(offer.budget_limit) : '-' }}
      </p>
    </div>
    <div class="space-y-4">
      <p class="text-gray-80 text-lg leading-none font-semibold">Segments Targeted</p>
      <div class="space-y-4">
        <TargetingSegmentCard
          v-for="(rule, index) in offer.offer_rules?.filter((r) => !!r)"
          :key="rule.id ?? index"
          :index="index"
          :rule="rule"
          :tenant-id="offer.tenant_id"
          :currency="ECurrency.AED"
        />
      </div>
    </div>
  </div>
</template>
