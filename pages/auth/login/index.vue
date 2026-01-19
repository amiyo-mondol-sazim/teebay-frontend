<script lang="ts" setup>
definePageMeta({ layout: "auth", middleware: "guest" });
useHead({
  title: "Login | Teebay",
  meta: [
    {
      name: "description",
      content: "Login to your account",
    },
  ],
});
</script>
<template>
  <main>
    <LoginContainer />
  </main>
</template>
