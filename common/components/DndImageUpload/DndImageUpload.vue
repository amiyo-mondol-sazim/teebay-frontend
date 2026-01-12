<script setup lang="ts">
import { toast } from 'vue-sonner';
import { getImageDimensions } from './DndImageUpload.helpers';
import type { TDndImageUploadProps } from './DndImageUpload.types';

const props = defineProps<TDndImageUploadProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void;
}>();

const fileInputRef = useTemplateRef<HTMLInputElement | null>('fileInputRef');
const selectedFile = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value as File),
});

const acceptString = computed(() => {
  return props.accept ? props.accept.join(',') : undefined;
});

const fileProps = computed(() => {
  if (!selectedFile.value) return undefined;
  if (selectedFile.value instanceof File) {
    return {
      url: URL.createObjectURL(selectedFile.value),
      name: selectedFile.value.name,
      size: selectedFile.value.size,
    };
  }
  return {
    url: selectedFile.value.image_url,
    name: selectedFile.value.image_filename,
    size: selectedFile.value.image_byte_size,
  };
});

async function processFile(file: File) {
  if (props.accept && !props.accept.includes(file.type)) {
    toast.error(`File type ${file.type} is not allowed`);
    return;
  }
  if (props.maxFileSize && file.size > props.maxFileSize) {
    const maxSizeMB = (props.maxFileSize! / 1024 / 1024).toFixed(1);
    toast.error(`File must be smaller than ${maxSizeMB}MB`);
    return;
  }
  if (props.maxDimensions) {
    const { width, height } = props.maxDimensions;
    const dimension = await getImageDimensions(file);
    if (dimension.width > width || dimension.height > height) {
      toast.error(`Image must be ${width}x${height}px or smaller`);
      return;
    }
  }
  selectedFile.value = file;
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  const [file] = Array.from(e.dataTransfer?.files || []);
  if (file) {
    processFile(file);
  }
}

function handleDragOver(e: DragEvent) {
  e.preventDefault();
}

function handleFileInputChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const [file] = Array.from(target.files || []);
  if (file) {
    processFile(file);
  }
  target.value = '';
}
</script>

<template>
  <div
    class="relative h-34 rounded-lg border-2 border-dashed p-4 text-center transition-colors"
    :class="
      selectedFile
        ? 'border-primary-300 bg-primary-25'
        : 'border-gray-40 hover:border-gray-60 hover:bg-gray-20 cursor-pointer'
    "
    @drop="(e) => handleDrop(e)"
    @dragover="handleDragOver"
    @click="fileInputRef?.click()"
  >
    <input ref="fileInputRef" type="file" class="hidden" :accept="acceptString" @change="handleFileInputChange" />
    <div v-if="fileProps" class="flex h-full items-center justify-center gap-3.5">
      <div class="flex items-center gap-3">
        <div class="bg-primary-25 size-15 overflow-hidden rounded-sm">
          <img v-if="fileProps" :src="fileProps.url" class="size-full object-cover" />
          <Icon v-else name="ph:image-square-fill" class="text-primary size-6" />
        </div>
        <div class="text-start">
          <p class="truncate text-sm font-semibold">{{ fileProps.name }}</p>
          <p class="mt-1 text-xs text-gray-100">{{ (fileProps.size / 1024 / 1024).toFixed(2) }} MB</p>
        </div>
      </div>
      <UiButton
        type="button"
        variant="outline"
        size="sm"
        class="border-gray-40 absolute top-1 right-1 shadow-none"
        @click.stop="selectedFile = null"
      >
        <Icon name="ph:x" class="size-3" /> Remove
      </UiButton>
    </div>
    <div v-else class="flex h-full flex-col items-center justify-center gap-3.5">
      <div class="bg-primary-25 mx-auto flex size-9 items-center justify-center rounded-sm">
        <Icon name="ph:image-square-fill" class="text-primary size-6" />
      </div>
      <div>
        <p class="text-sm font-semibold">Upload Image</p>
        <p class="mt-1 text-xs text-gray-100">Drag and drop image to upload</p>
      </div>
    </div>
  </div>
</template>
