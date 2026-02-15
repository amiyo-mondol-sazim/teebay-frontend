import { io, type Socket } from "socket.io-client";
import { computed, onUnmounted, ref, type Ref, watch } from "vue";
import { useQueryClient } from "@tanstack/vue-query";
import type { components } from "~/common/typedefs/api-schema";

import { useSendMessage } from "~/common/api/conversations/conversations.mutations";
import { useMessagesListQuery } from "~/common/api/conversations/conversations.queries";
import { conversationKeys } from "~/common/api/conversations/conversations.keys";
import { getAccessToken } from "~/common/utils/token";

type MessageResponse = components["schemas"]["MessageResponse"];
type MessagesListResponse = components["schemas"]["MessagesListResponse"];

export function useConversationMessages(conversationId: Ref<number | null>) {
  const socket = ref<Socket | null>(null);
  const queryClient = useQueryClient();
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

  const connectSocket = () => {
    const token = getAccessToken();
    if (!token) return;
    if (socket.value?.connected) return;
    if (!conversationId.value) return;

    socket.value = io(`${config.public.wsUrl}/chat`, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socket.value.on("connect", () => {
      socket.value?.emit("join", { conversations: [conversationId.value] });
    });

    socket.value.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socket.value.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
    });

    socket.value.on("newMessage", (data: MessageResponse) => {
      if (!conversationId.value) return;

      const transformedMessage = {
        ...data,
        sender: { id: data.sender.id, email: data.sender.email },
        readAt: undefined,
      };

      queryClient.setQueryData(
        conversationKeys.messages(String(conversationId.value)),
        (oldData: MessagesListResponse | undefined) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: [...oldData.data, transformedMessage],
          };
        },
      );
    });
  };

  const disconnectSocket = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  watch(
    () => conversationId.value,
    (newId, oldId) => {
      if (oldId && socket.value?.connected) {
        socket.value.emit("leave", { conversations: [oldId] });
      }
      if (newId) {
        disconnectSocket();
        connectSocket();
      } else {
        disconnectSocket();
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    disconnectSocket();
  });

  return {
    data: messagesQuery.data,
    sendMessage,
    isLoading: messagesQuery.isLoading,
    isSending: sendMessageMutation.isPending,
    error: messagesQuery.error,
  };
}
