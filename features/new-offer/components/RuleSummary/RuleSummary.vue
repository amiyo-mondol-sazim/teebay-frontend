<script setup lang="ts">
import { useFieldValue } from 'vee-validate';
import type { HtmlHTMLAttributes } from 'vue';
import { toast } from 'vue-sonner';
import { ERuleTarget, type ECurrency } from '~/common/typedefs/enums';
import { cn } from '~/common/utils/css';
import { generateRuleSummary, isRuleValid } from './RuleSummary.helpers';
import type { TPartialOfferRule } from './RuleSummary.types';

const props = defineProps<{
  rule: TPartialOfferRule;
  class?: HtmlHTMLAttributes['class'];
  currency: ECurrency;
}>();
const tenantId = useFieldValue<number | undefined>('tenant.id');
const count = ref<number | null>(null);
const { mutateAsync: fetchCount, isPending } = useGetRuleTargetUserCountMutation();

const formatRuleSummary = computed(() => generateRuleSummary(props.rule, props.currency));

const getTargetUserCount = async () => {
  if (!tenantId.value) return void toast.error('Please select a bank');
  const validation = isRuleValid(props.rule);
  if (!validation.isValid) return void toast.error(validation.errorMessage);
  count.value = await fetchCount({
    tenant_id: tenantId.value,
    offer_rule: {
      number_of_days: props.rule.in_last_days ?? 0,
      target_brand_ids: props.rule.target === ERuleTarget.BRAND ? props.rule.brands?.map((b) => b.id) : [],
      target_category_ids:
        props.rule.target === ERuleTarget.CATEGORY && props.rule.category?.id ? [props.rule.category.id] : [],
      target_sub_category_ids:
        props.rule.target === ERuleTarget.CATEGORY && props.rule.subcategory?.id ? [props.rule.subcategory.id] : [],
      transaction_count_lower_limit: props.rule.transaction_count?.min,
      transaction_count_upper_limit: props.rule.transaction_count?.max,
      transaction_amount_lower_limit: props.rule.amount_spent?.min,
      transaction_amount_upper_limit: props.rule.amount_spent?.max,
    },
  });
};
</script>

<template>
  <div :class="cn('border-gray-40 bg-gray-10 space-y-6 rounded-lg border p-6', props.class)">
    <div class="flex items-start justify-between">
      <div class="space-y-2">
        <h3 class="text-base font-bold text-gray-900">Rule Summary</h3>
        <p v-if="!formatRuleSummary.length" class="text-sm text-gray-400 italic">No conditions specified.</p>
        <div v-else class="space-y-2">
          <p v-for="(condition, i) in formatRuleSummary" :key="i" class="text-base text-gray-700">
            <span v-for="segment in condition" :key="segment.text" :class="segment.className">
              {{ segment.text }}
            </span>
          </p>
        </div>
      </div>

      <UiButton
        type="button"
        :variant="isPending ? 'ghost' : 'outline'"
        :class="isPending ? 'hover:bg-transparent' : 'border-primary hover:bg-primary/10'"
        class="hover:text-primary text-primary"
        @click="getTargetUserCount"
      >
        <Icon name="ph:calculator-bold" />
        {{ isPending ? 'Analyzing...' : 'Analyze' }}
      </UiButton>
    </div>

    <p class="bg-primary/10 flex h-12 items-center justify-center gap-2.5 rounded-md text-sm font-medium">
      <span>Based on your selection, this rule will be applied to</span>
      <Icon name="ph:users-fill" class="text-primary inline size-4" />
      <span class="text-primary font-bold"> {{ (count ?? 0).toLocaleString() }} Users</span>
    </p>
  </div>
</template>
