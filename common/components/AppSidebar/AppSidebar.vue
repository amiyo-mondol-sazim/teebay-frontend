<script lang="ts" setup>
import { NuxtLink } from "#components";
import logo from "~/assets/images/logo.svg";
import { PAGE_URLS } from "../../utils/constants";
import { useAuthActions } from "./AppSidebar.composables";
import { getInitials } from "./AppSidebar.helpers";
import type { AppSidebarProps } from "./AppSidebar.types";

defineProps<AppSidebarProps>();

const { data: user } = useUserQuery();
const { logout } = useAuthActions();
const userName = computed(
  () => user.value?.name || user.value?.email?.split("@")[0],
);

const route = useRoute();
const isActive = (path: string) => {
  return route.path === path;
};
</script>

<template>
  <UiSidebar default-open class="flex flex-col justify-between border-r">
    <UiSidebarHeader class="gap-6 px-4">
      <div class="flex h-25 items-center px-4">
        <img :src="logo" alt="Lune Pulse Logo" class="h-11" />
      </div>
    </UiSidebarHeader>
    <UiSidebarContent>
      <span
        style="
          background: linear-gradient(
            to right,
            white,
            rgb(223, 225, 226),
            white
          );
        "
        class="my-5 block h-0.25"
      />
      <nav>
        <ul class="flex flex-col gap-2 px-4">
          <li v-for="navItem in navItems" :key="navItem.name">
            <UiButton
              :as="NuxtLink"
              :to="navItem.path"
              variant="ghost"
              size="2xl"
              :class="
                cn(
                  'hover:bg-primary-25 w-full justify-start gap-2.5 text-base',
                  isActive(navItem.path) ? 'bg-primary-25' : '',
                )
              "
            >
              <Icon
                :name="navItem.icon"
                :class="
                  cn('size-7', isActive(navItem.path) ? 'text-primary' : '')
                "
              />
              {{ navItem.name }}
            </UiButton>
          </li>
        </ul>
      </nav>
    </UiSidebarContent>
    <UiSidebarFooter class="px-4 pb-6">
      <div
        v-if="user"
        class="border-gray-30 flex items-center gap-2 rounded-full border p-1.5"
      >
        <div
          class="bg-primary-25 text-primary flex size-15 items-center justify-center rounded-full text-xl font-bold italic"
        >
          {{ getInitials(userName || "Anonymous") }}
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-base font-bold">{{ userName ?? "User" }}</p>
          <div class="truncate text-sm text-gray-200 italic">
            {{ user?.email ?? "n/a" }}
          </div>
        </div>

        <ConfirmationModal
          title="Sign Out?"
          description="Are you sure you want to sign out your account?"
          action-text="Sign Out"
          @action="logout"
        >
          <UiButton
            variant="ghost"
            size="lg"
            class="text-gray-60 hover:text-gray-80 size-12 rounded-full"
          >
            <Icon name="ph:sign-out" class="size-5" />
          </UiButton>

          <template #action>
            <UiButton
              variant="primary"
              class="dark-gradient-shadow h-10.5 px-5 py-3 text-base font-semibold"
            >
              Sign Out
            </UiButton>
          </template>
        </ConfirmationModal>
      </div>
    </UiSidebarFooter>
  </UiSidebar>
</template>
