<script setup lang="ts">
import type { NuxtError } from '#app';
import { NuxtLink } from '#components';

defineProps({
  error: Object as () => NuxtError,
});
definePageMeta({
  layout: 'blank',
});
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <UiCard v-if="error?.statusCode === 404" class="w-full max-w-md py-10 text-center">
      <Icon name="ph:shapes" class="mx-auto h-10 w-10 text-gray-400" />
      <UiCardHeader>
        <UiCardTitle class="text-2xl font-bold">404 - Not Found</UiCardTitle>
        <UiCardDescription class="text-base text-gray-400"
          >The page you are looking for does not exist.</UiCardDescription
        >
      </UiCardHeader>
      <UiCardFooter class="justify-center">
        <UiButton :as="NuxtLink" :to="PAGE_URLS.HOME" size="xl">
          <Icon name="ph:house-fill" class="size-5" /> Go to Home
        </UiButton>
      </UiCardFooter>
    </UiCard>
    <UiCard v-else class="w-full max-w-md py-10 text-center">
      <Icon name="ph:seal-warning" class="mx-auto h-10 w-10 text-gray-400" />
      <UiCardHeader>
        <UiCardTitle class="text-2xl font-bold">Error</UiCardTitle>
        <UiCardDescription class="text-base text-gray-400">
          An error occurred while processing your request. Please try again later.
        </UiCardDescription>
      </UiCardHeader>

      <UiCardFooter class="justify-center">
        <UiButton :as="NuxtLink" :to="PAGE_URLS.HOME" size="xl">
          <Icon name="ph:house-fill" class="size-5" /> Go to Home
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
