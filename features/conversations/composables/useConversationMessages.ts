import { computed, onUnmounted, ref, watch } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import type { components } from "~/common/typedefs/api-schema";

import { conversationKeys } from "~/common/api/conversations/conversations.keys";
import { useMessagesListQuery } from "~/common/api/conversations/conversations.queries";

type MessageResponse = components["schemas"]["MessageResponse"];

export function useConversationMessages(conversationId: Ref<number | null>) {
  const queryClient = useQueryClient();
  const ws = ref<WebSocket | null>(null);
  const config = useRuntimeConfig();

  const conversationIdValue = computed(() => conversationId.value ?? 0);
  const isConversationIdValid = computed(
    () => conversationId.value !== null && conversationId.value !== 0,
  );

  const messagesQuery = useMessagesListQuery(
    conversationIdValue,
    isConversationIdValid,
  );
  const sendMessageMutation = useSendMessage();

  const sendMessage = (content: string) => {
    if (!conversationId.value) return;
    sendMessageMutation.mutate({
      conversationId: conversationId.value,
      content,
    });
  };

  const connectWebSocket = () => {
    if (ws.value?.readyState === WebSocket.OPEN) return;
    if (!conversationId.value) return;

    const wsUrl = `${config.public.wsUrl}/conversations/${conversationId.value}`;
    ws.value = new WebSocket(wsUrl);

    ws.value.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "newMessage" && conversationId.value) {
        queryClient.setQueryData(
          conversationKeys.messages(conversationId.value.toString()),
          (old: MessageResponse[] | undefined) => {
            return old ? [...old, data.message] : [data.message];
          }
        );
      }
    });
  };

  watch(
    () => conversationId.value,
    (newId) => {
      if (ws.value) {
        ws.value.close();
        ws.value = null;
      }
      if (newId) {
        connectWebSocket();
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    ws.value?.close();
  });

  return {
    data: messagesQuery.data,
    sendMessage,
    isLoading: messagesQuery.isLoading,
    isSending: sendMessageMutation.isPending,
    error: messagesQuery.error,
  };
}
