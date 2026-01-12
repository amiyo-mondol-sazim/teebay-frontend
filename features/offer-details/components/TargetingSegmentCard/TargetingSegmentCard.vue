<script setup lang="ts">
import { generateRuleSummary } from './TargetingSegmentCard.helpers';
import type { TTargetingSegmentCardProps } from './TargetingSegmentCard.types';

const props = defineProps<TTargetingSegmentCardProps>();
const count = ref<number | null>(null);
const { mutateAsync: fetchCount } = useGetRuleTargetUserCountMutation();
const formatRuleSummary = computed(() => generateRuleSummary(props.rule, props.currency));

onMounted(async () => {
  if (!props.tenantId) return;
  count.value = await fetchCount({
    tenant_id: props.tenantId,
    offer_rule: {
      number_of_days: props.rule.number_of_days ?? 0,
      target_brand_ids: Object.keys(props.rule.target_brands ?? {})
        .map(parseInt)
        .filter(Boolean),
      target_category_ids: Object.keys(props.rule.target_categories ?? {})
        .map(parseInt)
        .filter(Boolean),
      target_sub_category_ids: Object.keys(props.rule.target_sub_categories ?? {})
        .map(parseInt)
        .filter(Boolean),
      transaction_count_lower_limit: props.rule.transaction_count_lower_limit,
      transaction_count_upper_limit: props.rule.transaction_count_upper_limit,
      transaction_amount_lower_limit: props.rule.transaction_amount_lower_limit,
      transaction_amount_upper_limit: props.rule.transaction_amount_upper_limit,
    },
  });
});
</script>

<template>
  <div class="border-gray-30 space-y-2 rounded-md border p-5">
    <div class="flex gap-4">
      <p class="text-lg font-bold">Segment {{ index + 1 }}</p>
      <UiBadge class="bg-primary-25">
        <Icon name="ph:users-fill" class="text-primary-300 inline size-4" />
        <span class="text-primary-300 font-bold"> {{ (count ?? 0).toLocaleString() }} Users </span>
      </UiBadge>
    </div>
    <p v-if="!formatRuleSummary.length" class="text-sm text-gray-400 italic">No conditions specified.</p>
    <div v-else class="space-y-2">
      <p v-for="(condition, i) in formatRuleSummary" :key="i" class="text-base text-gray-700">
        <span v-for="segment in condition" :key="segment.text" :class="segment.className">
          {{ segment.text }}
        </span>
      </p>
    </div>
  </div>
</template>
