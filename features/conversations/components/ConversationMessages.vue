<script setup lang="ts">
import { nextTick, ref, watch } from "vue";
import { useConversationMessages } from "~/features/conversations/composables/useConversationMessages";
import { useConversationsState } from "~/features/conversations/composables/useConversationsState";
import MessageBubble from "./MessageBubble.vue";

const { activeConversationId, handleShowList } = useConversationsState();

const {
  data: messages,
  sendMessage,
  isLoading,
} = useConversationMessages(activeConversationId.value ?? 0);
const messageContent = ref("");
const scrollArea = ref<HTMLElement>();
const currentUserEmail = "user@example.com";

const handleSend = () => {
  if (messageContent.value.trim()) {
    sendMessage(messageContent.value);
    messageContent.value = "";
  }
};

watch(
  messages,
  () => {
    nextTick(() => {
      if (scrollArea.value) {
        scrollArea.value.scrollTop = scrollArea.value.scrollHeight;
      }
    });
  },
  { deep: true },
);
</script>

<template>
  <div
    v-if="!activeConversationId"
    class="flex items-center justify-center h-full p-8 text-center"
  >
    <p class="text-muted-foreground">
      Select a conversation to start messaging
    </p>
  </div>
  <div v-else class="flex flex-col h-full">
    <div class="p-4 border-b md:hidden">
      <UiButton variant="ghost" size="sm" @click="handleShowList">
        <Icon name="ph:arrow-left" class="mr-2" />
        Back
      </UiButton>
    </div>
    <div ref="scrollArea" class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-if="isLoading" class="flex justify-center p-4">
        <Icon name="ph:spinner" class="animate-spin h-6 w-6" />
      </div>
      <MessageBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :is-from-current-user="message.sender.email === currentUserEmail"
      />
    </div>
    <div class="p-4 border-t">
      <div class="flex gap-2">
        <UiTextarea
          v-model="messageContent"
          placeholder="Type a message..."
          class="flex-1"
          @keydown.enter.prevent="handleSend"
        />
        <UiButton size="icon" @click="handleSend">
          <Icon name="ph:paper-plane-right" />
        </UiButton>
      </div>
    </div>
  </div>
</template>
