import { computed, onUnmounted, ref, watch } from "vue";
import { useSendMessage } from "~/common/api/conversations/conversations.mutations";
import type { components } from "~/common/typedefs/api-schema";

type MessageResponse = components["schemas"]["MessageResponse"];

export function useConversationMessages(conversationId: Ref<number | null>) {
  console.log(conversationId.value);
  const messages = ref<MessageResponse[]>([]);
  const ws = ref<WebSocket | null>(null);
  const config = useRuntimeConfig();

  const sendMessageMutation = useSendMessage();

  const sendMessage = (content: string) => {
    console.log("Sending message", conversationId.value);
    sendMessageMutation.mutate({
      conversationId: conversationId.value ?? 0,
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
      if (data.type === "newMessage") {
        messages.value.push(data.message);
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
