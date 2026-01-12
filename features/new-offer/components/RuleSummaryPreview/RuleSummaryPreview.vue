<script setup lang="ts">
import type { ECurrency } from '~/common/typedefs/enums';
import { generateRuleSummary } from '../RuleSummary/RuleSummary.helpers';
import type { TPartialOfferRule } from '../RuleSummary/RuleSummary.types';

const props = defineProps<{
  rule: TPartialOfferRule;
  currency: ECurrency;
}>();

const formatRuleSummary = computed(() => generateRuleSummary(props.rule, props.currency));
</script>

<template>
  <p v-if="!formatRuleSummary.length" class="text-sm text-gray-400 italic">No conditions specified.</p>
  <div v-else class="space-y-2">
    <p v-for="(condition, i) in formatRuleSummary" :key="i" class="text-base text-gray-700">
      <span v-for="segment in condition" :key="segment.text" :class="segment.className">
        {{ segment.text }}
      </span>
    </p>
  </div>
</template>
