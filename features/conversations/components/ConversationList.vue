<script setup lang="ts">
import { useConversationsListQuery } from "~/common/api/conversations/conversations.queries";
import ConversationListItem from "./ConversationListItem.vue";

const router = useRouter();

interface Props {
  conversationId: number | null;
}

const props = defineProps<Props>();

const { data: conversations, isLoading, error } = useConversationsListQuery();

const conversationList = computed(() => {
  return conversations.value?.data ?? [];
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
        :is-active="conversation.id === props.conversationId"
        @click="router.push('/conversations?conversationId=' + conversation.id)"
      />
    </div>
  </div>
</template>
