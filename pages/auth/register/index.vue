<script lang="ts" setup>
definePageMeta({ layout: "auth", middleware: "guest" });
useHead({
  title: "Register | Teebay",
  meta: [
    {
      name: "description",
      content: "Create a new account",
    },
  ],
});
</script>
<template>
  <main>
    <RegisterContainer />
  </main>
</template>
