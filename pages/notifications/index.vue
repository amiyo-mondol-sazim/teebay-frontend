<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  layout: "default",
});

useHead({
  title: "Notifications | Teebay",
  meta: [
    {
      name: "description",
      content: "View your notifications",
    },
  ],
});
</script>

<template>
  <NotificationsContainer />
</template>
