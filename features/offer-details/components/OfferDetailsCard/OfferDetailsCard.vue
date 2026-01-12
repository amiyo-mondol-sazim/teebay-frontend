<script setup lang="ts">
import type { TOfferDetails } from '~/common/typedefs/api';
import { EAttachmentType } from '~/common/typedefs/enums';
import { getOfferStats, offerStatusMap } from './OfferDetailsCard.helpers';

const props = defineProps<{ offer: TOfferDetails }>();
const stats = getOfferStats(props.offer);
const status = props.offer.status ? offerStatusMap[props.offer.status] : null;

const { data: merchant, isLoading: isMerchantLoading } = useMerchantQuery();

const bannerUrl = computed(
  () => props.offer.offer_attachments?.find((item) => item.attachment_type === EAttachmentType.BANNER)?.image_url,
);
</script>

<template>
  <div class="border-gray-30 flex gap-6 rounded-2xl border p-4">
    <div class="bg-gray-20 h-50 w-70 flex-shrink-0 overflow-hidden rounded-[0.33rem]">
      <img v-if="bannerUrl" :src="bannerUrl" alt="Offer image" class="h-full w-full object-cover" />
      <NoImgPlaceholder v-else class="h-full w-full" />
    </div>
    <div class="flex flex-1 flex-col justify-center gap-8">
      <div class="space-y-1">
        <div class="flex items-center gap-2 pb-2">
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
              <p class="text-xl leading-3.5 font-semibold text-gray-600">
                {{ merchant?.name ?? 'Merchant' }}
              </p>
            </template>
          </div>
          <span
            v-if="status"
            class="ml-1 inline-flex items-center gap-1 rounded-full px-2 py-1.5"
            :class="status.cssClass"
          >
            <Icon name="custom:circle-fill" class="size-2" />
            <span class="font-figtree text-xs leading-none font-bold uppercase"> {{ status.label }} </span>
          </span>
        </div>
        <div class="flex justify-between">
          <div class="flex flex-1 flex-col gap-4">
            <h3 class="text-xl leading-none font-bold">
              {{ offer.name }}
            </h3>
            <p class="leading-3.5 text-gray-200">
              {{ offer.description }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-row gap-4.5">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="border-gray-30 flex flex-1 flex-col gap-3 rounded-[1.25rem] border bg-white p-5"
        >
          <span class="text-xs leading-3.5 font-semibold text-gray-200 uppercase">{{ stat.label }}</span>
          <div class="flex items-end gap-1">
            <span class="text-xl leading-none font-extrabold tracking-[-0.025em]">
              {{ stat.value }}
            </span>
            <span v-if="stat.currency" class="text-gray-60 text-sm leading-3.5 font-bold">{{ stat.currency }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
