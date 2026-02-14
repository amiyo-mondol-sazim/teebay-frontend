<script setup lang="ts">
import { computed } from "vue";
import type { components } from "~/common/typedefs/api-schema";
import { useConversationsList } from "~/features/conversations/composables/useConversationsList";
import { useConversationsState } from "~/features/conversations/composables/useConversationsState";
import ConversationListItem from "./ConversationListItem.vue";

type ConversationResponse = components["schemas"]["ConversationResponse"];

const { activeConversationId, handleSelectConversation } =
  useConversationsState();

const { data: conversations, isLoading, error } = useConversationsList();

const conversationList = computed(() => {
  const data = conversations.value;
  if (!data) return [];
  return (data.data ?? []) as unknown as ConversationResponse[];
});
</script>

<template>
  <div class="h-full overflow-y-auto border-r">
    <ConversationsEmptyState
      v-if="!isLoading && conversationList.length === 0"
    />
    <div v-else-if="isLoading" class="flex justify-center p-4">
      <Icon name="ph:spinner" class="animate-spin h-6 w-6" />
    </div>
    <div v-else-if="error" class="p-4 text-destructive">
      Error loading conversations
    </div>
    <div v-else class="p-2 space-y-2">
      <ConversationListItem
        v-for="conversation in conversationList"
        :key="conversation.id"
        :conversation="conversation"
        :is-active="conversation.id === activeConversationId"
        @click="handleSelectConversation(conversation.id)"
      />
    </div>
  </div>
</template>
