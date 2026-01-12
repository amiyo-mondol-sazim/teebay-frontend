<script setup lang="ts">
import type { TOfferAttachment } from '~/common/typedefs/api';
import { ASSET_LABELS } from './OfferAssetsTab.constants';

defineProps<{ attachments: TOfferAttachment[] }>();
</script>

<template>
  <div class="max-w-2xl space-y-10">
    <div v-for="attachment in attachments" :key="attachment.id" class="space-y-4">
      <p class="text-gray-80 text-lg font-semibold">{{ ASSET_LABELS[attachment.attachment_type] }}</p>
      <img
        v-if="attachment.image_url"
        :src="attachment.image_url"
        alt="Offer Assets"
        :class="`${attachment.attachment_type === 'logo' ? 'aspect-square max-w-25 object-contain' : 'max-w-md'} rounded-md`"
      />
      <NoImgPlaceholder v-else class="h-40 w-lg" />
    </div>
  </div>
</template>
