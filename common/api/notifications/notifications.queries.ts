import { useQuery } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import type { components } from "~/common/typedefs/api-schema";
import { client } from "../client";
import { notificationKeys } from "./notifications.keys";

type NotificationsListResponse =
  components["schemas"]["NotificationsListResponse"];
type UnreadCountResponse = components["schemas"]["UnreadCountResponse"];

interface GetNotificationsParams {
  page?: number;
  limit?: number;
}

async function getNotifications(params: GetNotificationsParams) {
  const { data, error } = await client.GET("/api/v1/notifications", {
    params: {
      query: {
        page: params.page,
        limit: params.limit,
      },
    },
  });
  if (error || !data) {
    toast.error("Failed to fetch notifications");
    throw error;
  }
  return data as NotificationsListResponse;
}

export function useNotificationsListQuery(params: GetNotificationsParams) {
  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: () => getNotifications(params),
  });
}

async function getUnreadCount() {
  const { data, error } = await client.GET(
    "/api/v1/notifications/unread-count",
  );
  if (error || !data) {
    toast.error("Failed to fetch unread count");
    throw error;
  }
  return data;
}

export function useUnreadCountQuery() {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: getUnreadCount,
    refetchInterval: 30000,
  });
}
