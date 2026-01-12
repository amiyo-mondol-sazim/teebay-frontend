<script setup lang="ts">
import 'vue-sonner/style.css'
import bgShadow from '~/assets/images/sigup-bg-shadow.svg';
</script>

<template>
  <div class="bg-primary-900 relative h-screen">
    <div class="relative z-1">
      <slot />
    </div>
    <UiToaster />
    <img
      :src="bgShadow"
      alt="bg shadow"
      width="90"
      height="64"
      class="absolute top-0 left-0 z-0 block h-full w-full object-fill"
    />
  </div>
</template>
