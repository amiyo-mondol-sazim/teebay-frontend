<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
  layoutTransition: { name: 'fade', mode: 'out-in' },
});
</script>

<template>
  <main>
    <HomepageContainer />
  </main>
</template>
