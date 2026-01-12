<script lang="ts" setup>
import { useLogin, useLoginForm } from './LoginForm.composables';

const form = useLoginForm();
const { login, isPending } = useLogin();
const onSubmit = form.handleSubmit((values) => login(values));
</script>

<template>
  <UiCard class="gap-0 px-8 pt-8 pb-10">
    <UiCardHeader>
      <UiCardTitle class="pb-6 text-center text-2xl leading-none font-bold">Welcome to Lune Pulse!</UiCardTitle>
    </UiCardHeader>
    <form @submit="onSubmit">
      <UiCardContent class="space-y-6 px-0 pt-10">
        <FormTextfield label="Email" name="email" type="email" placeholder="Enter your email" />
        <FormTextfield label="Password" name="password" type="password" placeholder="Enter your password" />
      </UiCardContent>
      <UiCardFooter class="px-0 pt-10">
        <UiButton size="2xl" class="h-15 w-full gap-2.5" :disabled="isPending">
          {{ isPending ? 'Logging in...' : 'Login' }}
          <Icon v-show="!isPending" name="custom:arrow-right" class="size-6" />
        </UiButton>
      </UiCardFooter>
    </form>
  </UiCard>
</template>
