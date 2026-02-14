<script setup lang="ts">
import type { components } from "~/common/typedefs/api-schema";

type MessageResponse = components["schemas"]["MessageResponse"];

interface Props {
  message: MessageResponse;
  isFromCurrentUser: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-col gap-1 p-3 rounded-lg max-w-[80%]"
    :class="
      props.isFromCurrentUser
        ? 'ml-auto bg-primary text-primary-foreground'
        : 'mr-auto bg-muted'
    "
  >
    <div class="flex items-center gap-2">
      <span class="text-sm font-medium">
        {{ props.message.sender.email }}
      </span>
      <span v-if="props.message.readAt" class="text-xs opacity-70">
        ✓ Read
      </span>
    </div>
    <p class="text-sm">{{ props.message.content }}</p>
    <span class="text-xs opacity-70">
      {{ new Date(props.message.createdAt).toLocaleTimeString() }}
    </span>
  </div>
</template>
