<script setup lang="ts">
import { computed, nextTick, ref, toRef, watch } from "vue";
import { useUserQuery } from "~/common/api/auth/auth.queries";
import { useConversationQuery } from "~/common/api/conversations/conversations.queries";
import { useConversationMessages } from "~/features/conversations/composables/useConversationMessages";
import MessageBubble from "./MessageBubble.vue";

interface Props {
  conversationId: number | null;
}

const props = defineProps<Props>();

const conversationIdRef = toRef(props, "conversationId");

const {
  data: messages,
  sendMessage,
  isLoading,
  isSending,
} = useConversationMessages(conversationIdRef);

const messageContent = ref("");
const textareaRef = ref<HTMLTextAreaElement>();
const scrollAreaRef = ref<HTMLElement>();

const { data: user } = useUserQuery();
const currentUserEmail = computed(() => user.value?.email);

const conversationId = computed(() => conversationIdRef.value ?? 0);
const isConversationIdValid = computed(
  () => conversationIdRef.value !== null && conversationIdRef.value !== 0,
);

const { data: conversation, isLoading: isConversationLoading } =
  useConversationQuery(conversationId, isConversationIdValid);

const getOtherParticipant = computed(() => {
  if (!conversation.value) return null;
  if (conversation.value.participant1.email === currentUserEmail.value) {
    return conversation.value.participant2;
  }
  return conversation.value.participant1;
});

const participantInitials = computed(() => {
  const email = getOtherParticipant.value?.email ?? "";
  const name = email.split("@")[0];
  if (!name) {
    return "?";
  }
  return name.slice(0, 2).toUpperCase();
});

const handleSend = () => {
  if (messageContent.value.trim() && !isSending.value) {
    sendMessage(messageContent.value);
    messageContent.value = "";
    nextTick(() => {
      adjustTextareaHeight();
    });
  }
};

const adjustTextareaHeight = () => {
  const textarea = textareaRef.value;
  if (!textarea) return;

  textarea.style.height = "auto";
  const newHeight = Math.min(textarea.scrollHeight, 160);
  textarea.style.height = `${newHeight}px`;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleSend();
  }
};

watch(
  messages,
  () => {
    nextTick(() => {
      if (scrollAreaRef.value) {
        scrollAreaRef.value.scrollTop = scrollAreaRef.value.scrollHeight;
      }
    });
  },
  { deep: true },
);

watch(messageContent, () => {
  nextTick(() => {
    adjustTextareaHeight();
  });
});
</script>

<template>
  <div
    v-if="!props.conversationId"
    class="flex flex-col items-center justify-center h-full p-8 text-center"
  >
    <Icon
      name="ph:chat-circle-dots"
      class="w-16 h-16 text-muted-foreground/50 mb-4"
    />
    <p class="text-muted-foreground">
      Select a conversation to start messaging
    </p>
  </div>
  <div
    v-else-if="props.conversationId && !isLoading && !messages"
    class="flex flex-col items-center justify-center h-full p-8 text-center"
  >
    <Icon name="ph:warning-circle" class="w-16 h-16 text-destructive mb-4" />
    <h3 class="text-lg font-semibold mb-2">Conversation not found</h3>
    <p class="text-muted-foreground mb-6 max-w-md">
      This conversation doesn't exist or you don't have access to it.
    </p>
    <UiButton as="NuxtLink" :to="PAGE_URLS.CONVERSATIONS">
      Back to conversations
    </UiButton>
  </div>
  <div v-else class="flex flex-col h-full bg-background">
    <div
      v-if="messages?.data"
      class="flex items-center gap-3 px-4 py-3 border-b bg-card/50 backdrop-blur-sm"
    >
      <div
        v-if="getOtherParticipant"
        class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary"
      >
        {{ participantInitials }}
      </div>
      <div class="flex-1 min-w-0">
        <p class="font-medium truncate">
          {{ getOtherParticipant?.email ?? "Unknown" }}
        </p>
        <NuxtLink
          v-if="conversation?.product"
          :to="`products/${conversation.product.id}`"
          class="inline-flex items-center gap-1.5 text-xs text-primary hover:underline truncate"
        >
          <Icon name="ph:package" class="h-3 w-3" />
          {{ conversation.product.title }}
        </NuxtLink>
      </div>
    </div>

    <div ref="scrollAreaRef" class="flex-1 overflow-y-auto p-4">
      <div
        v-if="isLoading || isConversationLoading"
        class="flex justify-center p-4"
      >
        <Icon
          name="ph:spinner"
          class="animate-spin h-6 w-6 text-muted-foreground"
        />
      </div>
      <div v-else class="flex flex-col gap-4">
        <MessageBubble
          v-for="message in messages?.data ?? []"
          :key="message.id"
          :message="message"
          :is-from-current-user="message.sender.email === currentUserEmail"
          :show-avatar="user?.email !== message.sender.email"
        />
      </div>
    </div>

    <div class="p-4 border-t bg-card/50">
      <div class="flex gap-3 items-center">
        <div class="flex-1 relative">
          <textarea
            ref="textareaRef"
            v-model="messageContent"
            placeholder="Type a message..."
            rows="1"
            class="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            @keydown="handleKeydown"
          />
        </div>
        <UiButton
          size="icon"
          class="h-11 w-11 rounded-xl flex-shrink-0"
          :disabled="!messageContent.trim() || isSending"
          @click="handleSend"
        >
          <Icon
            v-if="isSending"
            name="ph:spinner"
            class="animate-spin h-5 w-5"
          />
          <Icon v-else name="ph:paper-plane-right-fill" class="h-5 w-5" />
        </UiButton>
      </div>
    </div>
  </div>
</template>
