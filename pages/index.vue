<script setup lang="ts">
definePageMeta({
  middleware: "auth",
  layout: "default",
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
    <p class="text-muted-foreground mt-2">
      Welcome to your new Nuxt 3 Starter project.
    </p>

    <div class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Feature Driven</UiCardTitle>
          <UiCardDescription>Ready for modular development</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          Check <code>features/</code> to start adding your own modules.
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
