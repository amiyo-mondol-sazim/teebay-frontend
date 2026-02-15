<script setup lang="ts">
import {
  ENotificationStatusFilter,
  ENotificationTypeFilter,
} from "../notifications.types";
import { useMarkAllAsReadMutation } from "~/common/api/notifications/notifications.mutations";

const route = useRoute();
const router = useRouter();

const { mutate: markAllAsRead, isPending: isMarkingAllRead } =
  useMarkAllAsReadMutation();

const typeFilter = computed({
  get: () =>
    (route.query.type as ENotificationTypeFilter) ??
    ENotificationTypeFilter.ALL,
  set: (value) =>
    router.push({
      query: {
        ...route.query,
        type: value === ENotificationTypeFilter.ALL ? undefined : value,
      },
    }),
});

const statusFilter = computed({
  get: () =>
    (route.query.status as ENotificationStatusFilter) ??
    ENotificationStatusFilter.ALL,
  set: (value) =>
    router.push({
      query: {
        ...route.query,
        status: value === ENotificationStatusFilter.ALL ? undefined : value,
      },
    }),
});

const page = computed({
  get: () => Number(route.query.page) || 1,
  set: (value) =>
    router.push({
      query: { ...route.query, page: value === 1 ? undefined : value },
    }),
});

function handleMarkAllAsRead() {
  markAllAsRead();
}
</script>

<template>
  <div class="container mx-auto px-4 py-8 md:py-12">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Notifications</h1>
      <UiButton
        variant="outline"
        :disabled="isMarkingAllRead"
        @click="handleMarkAllAsRead"
      >
        <Icon
          v-if="isMarkingAllRead"
          name="ph:spinner"
          class="mr-2 h-4 w-4 animate-spin"
        />
        Mark all as read
      </UiButton>
    </div>

    <NotificationFilters
      v-model:type-filter="typeFilter"
      v-model:status-filter="statusFilter"
    />

    <div class="mt-6">
      <NotificationsList
        :type-filter="typeFilter"
        :status-filter="statusFilter"
        :page="page"
      />
    </div>
  </div>
</template>
