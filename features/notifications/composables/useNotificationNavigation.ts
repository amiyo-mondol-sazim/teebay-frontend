import { PAGE_URLS } from "~/common/utils/constants";
import type { TNotification } from "../notifications.types";
import { ENotificationType } from "../notifications.types";

export function useNotificationNavigation() {
  const router = useRouter();

  function getNavigationPath(notification: TNotification): string {
    switch (notification.type) {
      case ENotificationType.MESSAGE:
        if (notification.referenceId) {
          return `${PAGE_URLS.CONVERSATIONS}?conversationId=${notification.referenceId}`;
        }
        return PAGE_URLS.CONVERSATIONS;

      case ENotificationType.RENT_REQUEST:
        if (notification.referenceId) {
          return `/products/${notification.referenceId}`;
        }
        return PAGE_URLS.RENTS;

      case ENotificationType.SALE_REQUEST:
        if (notification.referenceId) {
          return `/products/${notification.referenceId}`;
        }
        return PAGE_URLS.SALES;

      default:
        return PAGE_URLS.HOME;
    }
  }

  async function navigateToNotification(notification: TNotification) {
    const path = getNavigationPath(notification);
    await router.push(path);
  }

  return {
    navigateToNotification,
    getNavigationPath,
  };
}
