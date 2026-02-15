<script setup lang="ts">
import { handleFileUpdate } from "./Step1ImageUpload.helpers";
import type { Step1Emits, Step1Props } from "./Step1ImageUpload.types";

const props = defineProps<Step1Props>();
const emit = defineEmits<Step1Emits>();

const selectedFile = ref<File | { id: number; image_url?: string } | null>(
  props.imageUrl ? { id: 0, image_url: props.imageUrl } : null,
);

const { mutateAsync: getPresignedUrl, isPending: isGettingUrl } =
  useGetPresignedUrlMutation();
const { mutateAsync: uploadFile, isPending: isUploadingFile } =
  useUploadFileMutation();

const isProcessing = computed(
  () => isGettingUrl.value || isUploadingFile.value,
);

const handleUpload = async (file: File | null) => {
  await handleFileUpdate(file, selectedFile, emit, getPresignedUrl, uploadFile);
};
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="space-y-1">
      <h2 class="text-xl font-semibold text-gray-900">Add Photos</h2>
      <p class="text-sm text-gray-500">Upload a clear image of your product.</p>
    </div>

    <DndImageUpload
      :model-value="selectedFile"
      :accept="['image/png', 'image/jpeg', 'image/jpg', 'image/webp']"
      :max-file-size="5 * 1024 * 1024"
      @update:model-value="handleUpload"
    />

    <div class="flex justify-end">
      <UiButton
        :disabled="!props.imageUrl || isProcessing"
        class="cursor-pointer"
        @click="emit('next')"
      >
        Next
      </UiButton>
    </div>
  </div>
</template>
