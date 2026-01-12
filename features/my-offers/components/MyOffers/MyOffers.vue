<script setup lang="ts">
import { NuxtLink } from '#components';
import { useIntersectionObserver } from '@vueuse/core';
import type { TOffersQueryParams } from '~/common/typedefs/query';
import { OFFER_PER_PAGE, OFFER_STATUS_LABELS } from './MyOffers.constants';

const queryParams = reactive<TOffersQueryParams>({ page: 1, per_page: OFFER_PER_PAGE, status: 'active' });
const { data: offersData, error, fetchNextPage, isFetching, isFetchingNextPage } = useOffersInfiniteQuery(queryParams);

const observer = useTemplateRef<HTMLDivElement>('observe');
useIntersectionObserver(observer, ([entry]) => {
  if (entry?.isIntersecting) {
    fetchNextPage();
  }
});
</script>

<template>
  <div class="px-8">
    <MyOfferTabs v-model="queryParams.status" />
  </div>
  <div class="space-y-4 pt-2 pb-10">
    <UiAlert v-if="error" variant="destructive">
      <UiAlertTitle> An error occurred </UiAlertTitle>
      <UiAlertDescription>
        {{ error.message }}
      </UiAlertDescription>
    </UiAlert>

    <div v-if="offersData?.length === 0" class="flex flex-col items-center justify-center gap-7 py-20">
      <div class="bg-primary/10 flex size-16 items-center justify-center rounded-full">
        <Icon name="ph:seal-percent-fill" class="text-primary size-9.5" />
      </div>

      <div class="flex flex-col gap-4 text-center">
        <p class="text-primary text-2xl leading-none font-bold">
          You have no {{ queryParams.status ? (OFFER_STATUS_LABELS[queryParams.status] ?? '') : '' }} offers currently.
        </p>
        <p class="text-xl leading-none font-semibold text-gray-200">Create a new offer now!</p>
      </div>

      <UiButton
        :as="NuxtLink"
        :to="PAGE_URLS.NEW_OFFER"
        variant="primary"
        class="h-10.5 py-3 text-base font-semibold has-[>svg]:px-5"
      >
        <Icon name="ph:plus-circle-fill" class="size-4" />
        Create Offer
      </UiButton>
    </div>

    <template v-for="offer in offersData" :key="offer.id">
      <OfferCard :offer="offer" />
      <hr class="border-gray-30 last-of-type:hidden" />
    </template>
    <template v-if="isFetching || isFetchingNextPage">
      <OfferCardSkeleton v-for="i in 2" :key="i" />
    </template>
    <div ref="observe" class="h-1"></div>
  </div>
</template>
