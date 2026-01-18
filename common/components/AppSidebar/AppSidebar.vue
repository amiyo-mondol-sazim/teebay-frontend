<script lang="ts" setup>
import logo from "~/assets/images/logo.svg";
import type { TAppNavItem, TAppSidebarProps } from "./AppSidebar.types";

interface Props extends Omit<TAppSidebarProps, "NAV_ITEMS"> {
  navItems: TAppNavItem[];
  userName: string;
  userEmail: string;
  userInitials: string;
}

defineProps<Props>();

defineEmits<{
  logout: [];
}>();
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
            <UiSidebarMenuItem v-for="navItem in navItems" :key="navItem.name">
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
                @action="$emit('logout')"
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
