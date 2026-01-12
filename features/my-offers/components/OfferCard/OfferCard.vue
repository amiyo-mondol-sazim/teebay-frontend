<script setup lang="ts">
import type { TOffer } from '~/common/typedefs/api';
import { formatOfferTiming } from '~/common/utils/offer';
import { getOfferStats, offerStatusMap } from './OfferCard.helpers';

const props = defineProps<{ offer: TOffer }>();

const time = formatOfferTiming(props.offer);
const stats = getOfferStats(props.offer);
const status = props.offer.status ? offerStatusMap[props.offer.status] : undefined;

const coverImage = computed(() => props.offer.cover_image?.image_url);
</script>

<template>
  <NuxtLink
    :to="offer.status === 'draft' ? PAGE_URLS.DRAFT_OFFER(offer.id!) : PAGE_URLS.OFFER(offer.id!)"
    class="hover:bg-gray-20 flex flex-row gap-7 rounded-xl border border-transparent px-8 py-6"
  >
    <div class="bg-gray-20 h-50 w-70 flex-shrink-0 overflow-hidden rounded-lg">
      <img v-if="coverImage" :src="coverImage" alt="Offer image" class="h-full w-full object-cover" />
      <NoImgPlaceholder v-else class="h-full w-full" />
    </div>
    <div class="flex flex-1 flex-col justify-center gap-8">
      <div class="space-y-1">
        <div>
          <span class="inline-flex items-center gap-1 rounded-full px-2 py-1.5" :class="status?.cssClass">
            <Icon name="custom:circle-fill" class="size-2.5" />
            <span class="font-figtree text-xs leading-none font-bold uppercase"> {{ status?.label }} </span>
          </span>
        </div>
        <div class="flex justify-between">
          <div class="min-w-0 flex-1 space-y-4">
            <h3 class="text-xl leading-none font-bold">
              {{ offer.name }}
            </h3>
            <p class="line-clamp-1 leading-normal font-medium text-gray-200">
              {{ offer.description ?? '-' }}
            </p>
          </div>
          <div class="flex shrink-0 flex-col items-end gap-4">
            <p class="text-left text-base leading-3.5 font-semibold text-gray-400">{{ time }}</p>
            <div class="flex h-4 items-center gap-2.5">
              <span class="text-base leading-none font-semibold text-gray-400">{{ offer.tenant_name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row gap-4.5">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="flex flex-1 flex-col gap-3 rounded-[1.25rem] border bg-white p-5 shadow-sm"
        >
          <span class="text-xs leading-3.5 font-semibold text-gray-200 uppercase">{{ stat.label }}</span>
          <div class="flex items-end gap-1">
            <span v-if="stat.value && stat.currency" class="text-gray-60 text-sm leading-3.5 font-bold">
              {{ stat.currency }}
            </span>
            <span class="text-xl leading-none font-extrabold tracking-[-0.025em]">
              {{ stat.value ?? '-' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
