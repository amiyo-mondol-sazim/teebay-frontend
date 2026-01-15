<script lang="ts" setup>
import { navItems } from "./AppShell.helpers";

const route = useRoute();
</script>

<template>
  <UiSidebarProvider>
    <AppSidebar :nav-items="navItems" />
    <UiScrollArea :key="route.path" class="max-h-screen w-full">
      <slot />
    </UiScrollArea>
  </UiSidebarProvider>
</template>
