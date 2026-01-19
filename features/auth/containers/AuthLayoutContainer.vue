<script setup lang="ts">
import "vue-sonner/style.css";
import bgShadow from "~/assets/images/sigup-bg-shadow.svg";
</script>

<template>
  <div
    class="bg-background relative min-h-screen w-full overflow-hidden flex items-center justify-center"
  >
    <div class="relative z-10 w-full">
      <slot />
    </div>
    <UiToaster />
    <img
      :src="bgShadow"
      alt="bg shadow"
      class="absolute top-0 left-0 z-0 block h-full w-full object-cover opacity-50 dark:opacity-20 pointer-events-none"
    />
    <div
      class="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl filter"
    />
    <div
      class="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl filter"
    />
  </div>
</template>
