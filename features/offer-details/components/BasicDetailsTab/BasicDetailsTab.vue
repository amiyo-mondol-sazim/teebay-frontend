<script setup lang="ts">
import type { TOfferDetails } from '~/common/typedefs/api';
import { getBasicDetails } from './BasicDetailsTab.helpers';

const props = defineProps<{ offer: TOfferDetails }>();

const basicDetails = computed(() => getBasicDetails(props.offer));
</script>

<template>
  <div class="max-w-4xl space-y-10 px-2">
    <div v-for="detail in basicDetails" :key="detail.label" class="space-y-2">
      <p class="text-gray-80 text-lg leading-none font-semibold">{{ detail.label }}</p>
      <p class="text-lg font-semibold whitespace-pre-wrap text-gray-600">{{ detail.value }}</p>
    </div>
  </div>
</template>
