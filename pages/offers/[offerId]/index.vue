<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layoutTransition: { name: 'fade', mode: 'out-in' },
});
</script>

<template>
  <main>
    <OfferDetailsContainer />
  </main>
</template>
