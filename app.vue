<script lang="ts" setup>
useAuthBroadcastListener();
</script>

<template>
  <div class="max-h-screen overflow-hidden">
    <NuxtLayout>
      <NuxtRouteAnnouncer />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition:
    transform 0.2s,
    opacity 0.2s;
}

.slide-bottom-enter-from,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translateY(10%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
