import type { components } from "~/common/typedefs/api-schema";

export type TNotification = components["schemas"]["NotificationResponse"];

export type TNotificationType = TNotification["type"];

export enum ENotificationType {
  MESSAGE = "MESSAGE",
  RENT_REQUEST = "RENT_REQUEST",
  SALE_REQUEST = "SALE_REQUEST",
}

export const NOTIFICATION_TYPE_CONFIG: Record<
  ENotificationType,
  { icon: string; color: string; label: string }
> = {
  [ENotificationType.MESSAGE]: {
    icon: "ph:chat-circle",
    color: "text-blue-500 bg-blue-500/10",
    label: "Message",
  },
  [ENotificationType.RENT_REQUEST]: {
    icon: "ph:key",
    color: "text-green-500 bg-green-500/10",
    label: "Rent Request",
  },
  [ENotificationType.SALE_REQUEST]: {
    icon: "ph:shopping-cart",
    color: "text-orange-500 bg-orange-500/10",
    label: "Sale Request",
  },
};

export enum ENotificationStatusFilter {
  ALL = "all",
  UNREAD = "unread",
  READ = "read",
}

export enum ENotificationTypeFilter {
  ALL = "all",
  MESSAGE = "MESSAGE",
  RENT_REQUEST = "RENT_REQUEST",
  SALE_REQUEST = "SALE_REQUEST",
}
