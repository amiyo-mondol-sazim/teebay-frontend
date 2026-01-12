<script setup lang="ts">
import { NuxtLink } from '#components';
import OfferDetailsSkeleton from '../OfferDetailsSkeleton/OfferDetailsSkeleton.vue';
import { offerDetailTabs } from './OfferDetails.helpers';

const route = useRoute();

const { data: offerDetails, isLoading, error } = useOfferDetailsQuery(Number(route.params.offerId));
</script>

<template>
  <div class="mb-8 flex items-center gap-4">
    <UiButton
      :as="NuxtLink"
      :to="PAGE_URLS.HOME"
      variant="ghost"
      size="icon"
      class="text-gray-60 hover:text-gray-60 hover:bg-gray-20"
    >
      <Icon name="ph:arrow-left" class="size-6" />
    </UiButton>
    <h1 class="text-2xl font-semibold">Offer Details</h1>
  </div>

  <div v-if="offerDetails" class="space-y-8">
    <OfferDetailsCard :offer="offerDetails" />
    <UiTabs default-value="basic-details" class="w-full gap-0">
      <UiTabsList class="h-auto rounded-none bg-transparent p-0">
        <UiTabsTrigger
          v-for="tab in offerDetailTabs"
          :key="tab.value"
          :value="tab.value"
          class="data-[state=active]:text-primary-300 data-[state=active]:border-b-primary-300 h-13.5 rounded-none border-x-0 border-b-3 px-6 text-lg font-semibold text-gray-100 transition-colors data-[state=active]:bg-transparent data-[state=active]:shadow-none"
        >
          {{ tab.label }}
        </UiTabsTrigger>
      </UiTabsList>
      <hr class="border-gray-40" />

      <div class="pt-10">
        <UiTabsContent value="basic-details">
          <BasicDetailsTab :offer="offerDetails" />
        </UiTabsContent>
        <UiTabsContent value="targeting">
          <OfferTargetingTab :offer="offerDetails" />
        </UiTabsContent>

        <UiTabsContent value="assets">
          <OfferAssetsTab :attachments="offerDetails.offer_attachments ?? []" />
        </UiTabsContent>
      </div>
    </UiTabs>
  </div>

  <OfferDetailsSkeleton v-else-if="isLoading" />

  <div v-else-if="error">
    <UiAlert variant="destructive">
      <UiAlertTitle>Error</UiAlertTitle>
      <UiAlertDescription>
        <Icon name="ph:warning" class="size-6" />
        <p class="text-sm text-gray-600">
          {{ error.message }}
        </p>
      </UiAlertDescription>
    </UiAlert>
  </div>
  <div v-else class="flex min-h-124 items-center justify-center">
    <OfferNotFoundCard />
  </div>
</template>
