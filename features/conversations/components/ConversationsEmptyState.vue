<template>
  <div class="flex flex-col items-center justify-center h-full p-8 text-center">
    <Icon
      name="ph:chat-circle-dots"
      class="w-16 h-16 text-muted-foreground mb-4"
    />
    <h3 class="text-lg font-semibold mb-2">No conversations yet</h3>
    <p class="text-muted-foreground mb-6 max-w-md">
      Browse products and start a conversation with owners to get started.
    </p>
    <UiButton as="NuxtLink" to="/products"> Browse Products </UiButton>
  </div>
</template>
