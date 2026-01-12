<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layout: 'blank',
  layoutTransition: { name: 'slide-bottom', mode: 'out-in' },
});
</script>

<template>
  <main>
    <NewOfferContainer />
  </main>
</template>
