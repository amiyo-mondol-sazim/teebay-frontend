<script setup lang="ts">
import type { components } from "~/common/typedefs/api-schema";
import {
  ENotificationStatusFilter,
  ENotificationTypeFilter,
} from "../notifications.types";
import { useMarkAsReadMutation } from "~/common/api/notifications/notifications.mutations";
import { useNotificationsListQuery } from "~/common/api/notifications/notifications.queries";
import { useNotificationNavigation } from "../composables/useNotificationNavigation";

type NotificationResponse = components["schemas"]["NotificationResponse"];
type PaginationMeta = components["schemas"]["PaginationMetadataResponse"];

interface Props {
  typeFilter: ENotificationTypeFilter;
  statusFilter: ENotificationStatusFilter;
  page: number;
}

const props = defineProps<Props>();

const router = useRouter();
const route = useRoute();

const { navigateToNotification } = useNotificationNavigation();
const markAsReadMutation = useMarkAsReadMutation();

const { data, isLoading, isError, refetch } = useNotificationsListQuery({
  page: props.page,
  limit: 20,
});

const notifications = computed<NotificationResponse[]>(
  () => data.value?.data ?? [],
);

const meta = computed<PaginationMeta | undefined>(() => data.value?.meta);

const filteredNotifications = computed(() => {
  let result = notifications.value;

  if (props.typeFilter !== ENotificationTypeFilter.ALL) {
    result = result.filter((n) => n.type === props.typeFilter);
  }

  if (props.statusFilter === ENotificationStatusFilter.UNREAD) {
    result = result.filter((n) => !n.readAt);
  } else if (props.statusFilter === ENotificationStatusFilter.READ) {
    result = result.filter((n) => n.readAt);
  }

  return result;
});

const emptyState = computed(() => {
  if (
    props.typeFilter !== ENotificationTypeFilter.ALL ||
    props.statusFilter !== ENotificationStatusFilter.ALL
  ) {
    return {
      title: "No notifications match your filters",
      description: "Try changing your filter criteria",
    };
  }
  return {
    title: "No notifications yet",
    description:
      "You'll see notifications when you receive messages, rent requests, or sale requests",
  };
});

async function handleNotificationClick(notification: NotificationResponse) {
  if (!notification.readAt) {
    await markAsReadMutation.mutateAsync(notification.id);
  }
  await navigateToNotification(notification);
}

function handlePageChange(newPage: number) {
  router.push({ query: { ...route.query, page: newPage } });
}
</script>

<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="space-y-3">
      <div
        v-for="i in 5"
        :key="i"
        class="flex gap-4 rounded-lg border border-border p-4"
      >
        <UiSkeleton class="h-10 w-10 rounded-full" />
        <div class="flex-1 space-y-2">
          <UiSkeleton class="h-4 w-3/4" />
          <UiSkeleton class="h-3 w-full" />
        </div>
      </div>
    </div>

    <div
      v-else-if="isError"
      class="flex flex-col items-center justify-center py-12 text-center"
    >
      <p class="mb-4 text-destructive">Failed to load notifications</p>
      <UiButton variant="outline" @click="refetch()">Retry</UiButton>
    </div>

    <template v-else>
      <div v-if="filteredNotifications.length === 0">
        <NotificationEmpty
          :title="emptyState.title"
          :description="emptyState.description"
        />
      </div>

      <div v-else class="space-y-3">
        <NotificationCard
          v-for="notification in filteredNotifications"
          :key="notification.id"
          :notification="notification"
          @click="handleNotificationClick"
        />
      </div>

      <div
        v-if="meta && meta.totalPages > 1"
        class="mt-8 flex items-center justify-center space-x-4"
      >
        <UiButton
          variant="outline"
          :disabled="!meta || meta.currentPage <= 1"
          @click="handlePageChange((meta?.currentPage ?? 1) - 1)"
        >
          Previous
        </UiButton>
        <span class="text-sm font-medium">
          Page {{ meta?.currentPage ?? 1 }} of {{ meta?.totalPages ?? 1 }}
        </span>
        <UiButton
          variant="outline"
          :disabled="!meta?.hasNextPage"
          @click="handlePageChange((meta?.currentPage ?? 1) + 1)"
        >
          Next
        </UiButton>
      </div>
    </template>
  </div>
</template>
