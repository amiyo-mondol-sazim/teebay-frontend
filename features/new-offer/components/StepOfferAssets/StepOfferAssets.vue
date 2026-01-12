<script setup lang="ts">
import { useField } from 'vee-validate';
import { EAttachmentType } from '~/common/typedefs/enums';
import { MEGABYTE } from '~/common/utils/constants';
import { useAssetSelectionStore } from '../NewOfferForm/NewOfferForm.composables';
import { ASSET_UPLOAD_SECTIONS } from './StepOfferAssets.constants';

const bannerImageField = useField('banner_image_url');
const promotionImageField = useField('promotional_image_url');
const companyLogoField = useField('company_logo_url');

const { assets, setAsset } = useAssetSelectionStore();

function handleFileUpload(file: File | null, section: EAttachmentType) {
  setAsset(section, file);

  switch (section) {
    case EAttachmentType.BANNER:
      bannerImageField.setValue(file ? DEFAULT_OFFER_IMAGE_URL : undefined);
      break;
    case EAttachmentType.PROMOTIONAL:
      promotionImageField.setValue(file ? DEFAULT_OFFER_IMAGE_URL : undefined);
      break;
    case EAttachmentType.LOGO:
      companyLogoField.setValue(file ? DEFAULT_OFFER_IMAGE_URL : undefined);
      break;
  }
}

function getErrorMessage(section: string) {
  switch (section) {
    case EAttachmentType.BANNER:
      return bannerImageField.errorMessage;
    case EAttachmentType.PROMOTIONAL:
      return promotionImageField.errorMessage;
    case EAttachmentType.LOGO:
      return companyLogoField.errorMessage;
  }
}
</script>

<template>
  <h2 class="text-primary-900 mb-10 text-[1.75rem] font-bold">Offer Assets</h2>
  <div class="space-y-6">
    <div v-for="section in ASSET_UPLOAD_SECTIONS" :key="section.id">
      <h3 class="mb-3.5 text-sm font-medium text-gray-400">{{ section.title }}</h3>
      <DndImageUpload
        :model-value="assets[section.id]"
        :accept="['image/png', 'image/jpeg', 'image/jpg']"
        :max-file-size="section.maxFileSize"
        :max-dimensions="section.dimension"
        @update:model-value="handleFileUpload($event, section.id)"
      />
      <p v-if="getErrorMessage(section.id)?.value" class="text-destructive mt-1 text-xs">
        {{ getErrorMessage(section.id) }}
      </p>
      <div v-else-if="section.dimension || section.maxFileSize" class="mt-1 text-xs text-gray-100">
        <p v-if="section.dimension">
          Maximum dimension: {{ section.dimension.width }} px <Icon name="ph:x" class="inline" />
          {{ section.dimension.height }} px
        </p>
        <p v-if="section.maxFileSize">Maximum file size: {{ section.maxFileSize / MEGABYTE }} MB</p>
      </div>
    </div>
  </div>
</template>
