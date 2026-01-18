<script lang="ts" setup>
import { NAV_ITEMS } from "../AppShell/AppShell.helpers";
import { useAuthActions } from "./AppSidebar.composables";
import { getInitials } from "./AppSidebar.helpers";
import AppSidebar from "./AppSidebar.vue";

const { data: user } = useUserQuery();
const { logout } = useAuthActions();

const userName = computed(() => user.value?.email?.split("@")[0] ?? "User");
const userEmail = computed(() => user.value?.email ?? "");
const userInitials = computed(() => getInitials(userName.value));

const handleLogout = () => {
  logout();
};
</script>

<template>
  <AppSidebar
    :nav-items="NAV_ITEMS"
    :user-name="userName"
    :user-email="userEmail"
    :user-initials="userInitials"
    @logout="handleLogout"
  />
</template>
