import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import { client } from "../client";
import { notificationKeys } from "./notifications.keys";

async function markAsRead(notificationId: number) {
  const { error } = await client.PATCH("/api/v1/notifications/{id}/read", {
    params: { path: { id: notificationId } },
  });
  if (error) {
    throw new Error(error?.message || "Failed to mark as read");
  }
}

export function useMarkAsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      toast.success("Notification marked as read");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to mark as read");
    },
  });
}

async function markAllAsRead() {
  const { error } = await client.PATCH("/api/v1/notifications/read-all");
  if (error) {
    throw new Error(error?.message || "Failed to mark all as read");
  }
}

export function useMarkAllAsReadMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
      toast.success("All notifications marked as read");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to mark all as read");
    },
  });
}
