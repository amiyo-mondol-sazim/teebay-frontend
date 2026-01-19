<script lang="ts" setup>
import { useLoginForm } from "./LoginForm.composables";

interface Props {
  isPending?: boolean;
}

withDefaults(defineProps<Props>(), {
  isPending: false,
});

const emit = defineEmits<{
  submit: [values: { email: string; password: string }];
}>();

const form = useLoginForm();
const onSubmit = form.handleSubmit((values) => emit("submit", values));
</script>

<template>
  <UiCard
    class="glass-panel border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-xl"
  >
    <UiCardHeader class="space-y-2 text-center pb-8 pt-10">
      <div
        class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20"
      >
        <Icon name="lucide:log-in" class="size-6" />
      </div>
      <UiCardTitle
        class="text-3xl font-serif font-medium tracking-tight text-foreground"
      >
        Welcome Back
      </UiCardTitle>
      <p class="text-base text-muted-foreground">
        Enter your credentials to access your Teebay account.
      </p>
    </UiCardHeader>
    <form @submit="onSubmit">
      <UiCardContent class="space-y-5 px-8">
        <FormTextfield
          label="Email"
          name="email"
          type="email"
          placeholder="name@example.com"
        />
        <div class="space-y-1">
          <FormTextfield
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <div class="flex justify-end">
            <NuxtLink
              to="/auth/forgot-password"
              class="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </NuxtLink>
          </div>
        </div>
      </UiCardContent>
      <UiCardFooter class="flex flex-col gap-4 px-8 pb-10 pt-6">
        <UiButton
          size="lg"
          class="w-full text-base font-medium shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          :disabled="isPending"
        >
          <span v-if="!isPending">Sign in</span>
          <span v-else>Signing in...</span>
          <Icon
            v-if="!isPending"
            name="heroicons:arrow-right-20-solid"
            class="ml-2 size-5"
          />
        </UiButton>

        <div class="text-center text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink
            to="/auth/register"
            class="font-semibold text-primary hover:underline underline-offset-4"
          >
            Sign up
          </NuxtLink>
        </div>
      </UiCardFooter>
    </form>
  </UiCard>
</template>
