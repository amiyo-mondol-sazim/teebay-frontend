import { io, type Socket } from "socket.io-client";
import { ref, onUnmounted, watch } from "vue";
import { toast } from "vue-sonner";
import { useQueryClient } from "@tanstack/vue-query";

import { getAccessToken } from "~/common/utils/token";

import { notificationKeys } from "~/common/api/notifications/notifications.keys";

type NotificationEvent = {
  id: number;
  type: string;
  title: string;
  body: string;
  referenceId?: number;
  createdAt: string;
};

export function useRealtimeNotifications() {
  const socket = ref<Socket | null>(null);
  const queryClient = useQueryClient();
  const config = useRuntimeConfig();
  const isConnected = ref(false);

  const connect = () => {
    const token = getAccessToken();
    if (!token) return;
    if (socket.value?.connected) return;

    socket.value = io(`${config.public.wsUrl}/chat`, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socket.value.on("connect", () => {
      isConnected.value = true;
    });

    socket.value.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      isConnected.value = false;
    });

    socket.value.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
      isConnected.value = false;
    });

    socket.value.on("notification", (data: NotificationEvent) => {
      toast(data.title, {
        description: data.body,
        duration: 5000,
      });

      queryClient.invalidateQueries({ queryKey: notificationKeys.unreadCount() });
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    });
  };

  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
      isConnected.value = false;
    }
  };

  watch(
    () => getAccessToken(),
    (token) => {
      if (token) {
        disconnect();
        connect();
      } else {
        disconnect();
      }
    },
    { immediate: true },
  );

  onUnmounted(() => {
    disconnect();
  });

  return {
    isConnected,
  };
}
