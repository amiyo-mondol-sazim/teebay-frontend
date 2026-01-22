<script lang="ts" setup>
import logo from "~/assets/images/logo.svg";
import { NAV_ITEMS } from "../AppShell/AppShell.helpers";
import { useAuthActions } from "./AppSidebar.composables";
import { getInitials, getUserEmail, getUserName } from "./AppSidebar.helpers";

const { data: user } = useUserQuery();
const { logout } = useAuthActions();

const userName = computed(() => getUserName(user.value?.email));
const userEmail = computed(() => getUserEmail(user.value?.email));
const userInitials = computed(() => getInitials(userName.value));
</script>

<template>
  <UiSidebar collapsible="icon">
    <UiSidebarHeader>
      <UiSidebarMenu>
        <UiSidebarMenuItem>
          <UiSidebarMenuButton
            size="lg"
            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!mx-auto"
          >
            <div
              class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
            >
              <img :src="logo" alt="TeeBay Logo" class="size-6" />
            </div>
            <div
              class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden"
            >
              <span class="truncate font-bold">TeeBay</span>
            </div>
          </UiSidebarMenuButton>
        </UiSidebarMenuItem>
      </UiSidebarMenu>
    </UiSidebarHeader>
    <UiSidebarContent>
      <UiSidebarGroup>
        <UiSidebarGroupContent>
          <UiSidebarMenu>
            <UiSidebarMenuItem v-for="navItem in NAV_ITEMS" :key="navItem.name">
              <UiSidebarMenuButton
                as-child
                size="lg"
                :tooltip="navItem.name"
                :is-active="$route.path === navItem.path"
                class="group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!mx-auto"
              >
                <NuxtLink :to="navItem.path">
                  <Icon :name="navItem.icon" />
                  <span class="group-data-[collapsible=icon]:hidden">{{
                    navItem.name
                  }}</span>
                </NuxtLink>
              </UiSidebarMenuButton>
            </UiSidebarMenuItem>
          </UiSidebarMenu>
        </UiSidebarGroupContent>
      </UiSidebarGroup>
    </UiSidebarContent>
    <UiSidebarFooter>
      <UiSidebarMenu>
        <UiSidebarMenuItem>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiSidebarMenuButton
                size="lg"
                class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:!mx-auto"
              >
                <div
                  class="bg-sidebar-accent text-sidebar-primary flex size-8 items-center justify-center rounded-lg text-xs font-bold italic"
                >
                  {{ userInitials }}
                </div>
                <div
                  class="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden"
                >
                  <span class="truncate font-semibold">{{ userName }}</span>
                  <span class="truncate text-xs">{{ userEmail }}</span>
                </div>
                <Icon
                  name="lucide:chevrons-up-down"
                  class="ml-auto size-4 group-data-[collapsible=icon]:hidden"
                />
              </UiSidebarMenuButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent
              class="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="top"
              align="end"
              :side-offset="4"
            >
              <ConfirmationModal
                title="Sign Out?"
                description="Are you sure you want to sign out your account?"
                action-text="Sign Out"
                @action="logout"
              >
                <UiDropdownMenuItem @select.prevent>
                  <Icon name="ph:sign-out" class="mr-2 size-4" />
                  <span>Sign Out</span>
                </UiDropdownMenuItem>
              </ConfirmationModal>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </UiSidebarMenuItem>
      </UiSidebarMenu>
    </UiSidebarFooter>
    <UiSidebarRail />
  </UiSidebar>
</template>
