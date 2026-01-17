<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <UiSidebarProvider class="h-svh">
    <AppSidebarContainer />
    <UiSidebarInset class="h-full">
      <UiScrollArea :key="route.path" class="h-full w-full">
        <slot />
      </UiScrollArea>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>
