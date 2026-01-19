<script setup lang="ts">
import type { TRegisterInput } from "../components/RegisterForm/RegisterForm.helpers";
import { useRegister } from "../components/RegisterForm/RegisterForm.composables";

const { register, isPending } = useRegister();

const handleSubmit = (values: TRegisterInput) => {
  register(values);
};
</script>

<template>
  <div class="w-full max-w-md mx-auto animate-fade-in-up">
    <RegisterForm :is-pending="isPending" @submit="handleSubmit" />
  </div>
</template>
