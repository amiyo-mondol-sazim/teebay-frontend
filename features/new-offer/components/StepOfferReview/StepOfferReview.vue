<script setup lang="ts">
import { useFormValues } from 'vee-validate';
import { ECurrency } from '~/common/typedefs/enums';
import { useAssetSelectionStore } from '../NewOfferForm/NewOfferForm.composables';
import type { TOfferForm } from '../NewOfferForm/NewOfferForm.helpers';
import { getReviewData } from './StepOfferReview.helpers';

const emits = defineEmits<{ goToFirstTab: [] }>();
const formValues = useFormValues<TOfferForm>();
const { assets } = useAssetSelectionStore();
const { data: merchant, isLoading: isMerchantLoading } = useMerchantQuery();

const reviewData = computed(() => getReviewData(formValues.value));
const imageUrls = computed(() =>
  Object.values(assets)
    .filter((asset) => !!asset)
    .map((asset) => ('image_url' in asset ? asset.image_url : URL.createObjectURL(asset))),
);
</script>

<template>
  <div class="flex items-center gap-2 pb-10">
    <UiButton variant="ghost" size="icon" type="button" @click="emits('goToFirstTab')">
      <Icon name="ph:arrow-left-bold" class="size-6 text-gray-100" />
    </UiButton>
    <h2 class="text-primary-900 text-[1.75rem] font-bold">Review Offer</h2>
  </div>
  <div class="border-gray-40 mb-8 space-y-4 rounded-2xl border p-4">
    <div class="flex gap-6">
      <div class="flex gap-6">
        <div
          v-for="imageUrl in imageUrls"
          :key="imageUrl"
          class="bg-gray-20 aspect-7/5 max-w-28 flex-1 overflow-hidden rounded-[0.33rem]"
        >
          <img :src="imageUrl" alt="Banner" class="h-full w-full object-cover" />
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <template v-if="isMerchantLoading">
            <UiSkeleton class="size-8 rounded-[0.33rem]" />
            <UiSkeleton class="h-5 w-24 rounded" />
          </template>
          <template v-else>
            <img
              v-if="merchant?.logo"
              :src="merchant.logo"
              alt="Merchant logo"
              class="border-gray-30 size-8 rounded-[0.33rem] border object-cover"
            />
            <span
              v-else
              class="bg-gray-20 flex size-8 items-center justify-center rounded-[0.33rem] border font-bold text-gray-400"
            >
              {{ merchant?.name?.[0]?.toUpperCase() }}
            </span>
            <p class="text-xl leading-3.5 font-semibold text-gray-400">
              {{ merchant?.name ?? 'Merchant' }}
            </p>
          </template>
        </div>
        <p class="text-xl font-bold text-gray-600">{{ formValues.name || 'Untitled Offer' }}</p>
      </div>
    </div>
  </div>

  <div class="space-y-10">
    <div v-for="item in reviewData" :key="item.label" class="space-y-2">
      <h4 class="text-gray-80 text-base font-semibold">{{ item.label }}</h4>
      <p>{{ item.value }}</p>
    </div>

    <div v-if="formValues.rules?.length" class="space-y-4">
      <h4 class="text-gray-80 text-base font-semibold">Rules Summary</h4>
      <div class="space-y-4">
        <div v-for="(rule, index) in formValues.rules" :key="index" class="space-y-2">
          <p>Rule #{{ index + 1 }}</p>
          <RuleSummaryPreview :rule="rule" :currency="formValues.currency || ECurrency.AED" />
        </div>
      </div>
    </div>
  </div>
</template>
