import { computed, onUnmounted, ref, watch } from "vue";
import { useSendMessage } from "~/common/api/conversations/conversations.mutations";
import type { components } from "~/common/typedefs/api-schema";

type MessageResponse = components["schemas"]["MessageResponse"];

export function useConversationMessages(conversationId: number) {
  const messages = ref<MessageResponse[]>([]);
  const ws = ref<WebSocket | null>(null);
  const config = useRuntimeConfig();

  const sendMessageMutation = useSendMessage();

  const sendMessage = (content: string) => {
    sendMessageMutation.mutate({
      conversationId,
      content,
    });
  };

  const connectWebSocket = () => {
    if (ws.value?.readyState === WebSocket.OPEN) return;

    const wsUrl = `${config.public.wsUrl}/conversations/${conversationId}`;
    ws.value = new WebSocket(wsUrl);

    ws.value.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "newMessage") {
        messages.value.push(data.message);
      }
    });
  };

  watch(
    () => conversationId,
    (newId) => {
      if (ws.value) {
        ws.value.close();
        ws.value = null;
      }
      messages.value = [];
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
    data: computed(() => messages.value),
    sendMessage,
    isLoading: computed(() => sendMessageMutation.isPending.value),
  };
}
