<script setup lang="ts">
import { NuxtLink } from '#components';
</script>

<template>
  <UiCard class="w-full max-w-md py-10 text-center">
    <Icon name="ph:shapes" class="mx-auto h-10 w-10 text-gray-400" />
    <UiCardHeader>
      <UiCardTitle class="text-2xl font-bold">404 - Not Found</UiCardTitle>
      <UiCardDescription class="text-base text-gray-400"
        >The offer you are looking for does not exist.</UiCardDescription
      >
    </UiCardHeader>
    <UiCardFooter class="justify-center">
      <UiButton :as="NuxtLink" :to="PAGE_URLS.HOME" size="xl">
        <Icon name="ph:house-fill" class="size-5" /> Go to Home
      </UiButton>
    </UiCardFooter>
  </UiCard>
</template>
