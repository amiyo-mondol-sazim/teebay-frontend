<script setup lang="ts">
import { useLogin } from "../components/LoginForm/LoginForm.composables";

const { login, isPending } = useLogin();

const handleSubmit = (values: { email: string; password: string }) => {
  login(values);
};
</script>

<template>
  <div class="w-full max-w-md mx-auto animate-fade-in-up">
    <LoginForm :is-pending="isPending" @submit="handleSubmit" />
  </div>
</template>
