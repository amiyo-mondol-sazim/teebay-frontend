<script setup lang="ts">
import { computed } from "vue";

interface Props {
  conversation: components["schemas"]["ConversationResponse"];
  isActive: boolean;
}

const props = defineProps<Props>();

const participantName = computed(() => {
  return props.conversation.participant2?.email ?? "Unknown";
});

const productTitle = computed(() => {
  return props.conversation.product?.title ?? "Direct message";
});
</script>

<template>
  <div
    class="p-3 rounded-lg cursor-pointer transition-colors"
    :class="props.isActive ? 'bg-muted' : 'hover:bg-muted/50'"
  >
    <div class="flex items-center justify-between">
      <div>
        <p class="font-medium">{{ participantName }}</p>
        <p v-if="conversation.product" class="text-sm text-muted-foreground">
          About: {{ productTitle }}
        </p>
      </div>
      <span
        v-if="conversation.lastMessageAt"
        class="text-xs text-muted-foreground"
      >
        {{ new Date(conversation.lastMessageAt).toLocaleDateString() }}
      </span>
    </div>
  </div>
</template>
