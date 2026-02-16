<script setup lang="ts">
import "vue-sonner/style.css";
</script>

<template>
  <AuthLayoutContainer>
    <slot />
    <UiToaster
      position="top-right"
      :rich-colors="true"
      :expand="true"
      :close-button="false"
      :duration="4000"
      :gap="8"
      theme="system"
    />
  </AuthLayoutContainer>
</template>
