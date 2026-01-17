<script lang="ts" setup>
import type { TRegisterInput } from "./RegisterForm.helpers";
import { useRegisterForm } from "./RegisterForm.composables";

interface Props {
  isPending?: boolean;
}

withDefaults(defineProps<Props>(), {
  isPending: false,
});

const emit = defineEmits<{
  submit: [values: TRegisterInput];
}>();

const form = useRegisterForm();
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
        <Icon name="lucide:user-plus" class="size-6" />
      </div>
      <UiCardTitle
        class="text-3xl font-serif font-medium tracking-tight text-foreground"
      >
        Create Account
      </UiCardTitle>
      <p class="text-base text-muted-foreground">
        Join Teebay today and start exploring.
      </p>
    </UiCardHeader>
    <form @submit="onSubmit">
      <UiCardContent class="space-y-5 px-8">
        <div class="grid grid-cols-2 gap-4">
          <FormTextfield
            label="First Name"
            name="firstName"
            type="text"
            placeholder="John"
          />
          <FormTextfield
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />
        </div>
        <FormTextfield
          label="Email"
          name="email"
          type="email"
          placeholder="name@example.com"
        />
        <div class="space-y-5">
          <FormTextfield
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
          />
          <FormTextfield
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
          />
        </div>
      </UiCardContent>
      <UiCardFooter class="flex flex-col gap-4 px-8 pb-10 pt-6">
        <UiButton
          size="lg"
          class="w-full text-base font-medium shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          :disabled="isPending"
        >
          <span v-if="!isPending">Create account</span>
          <span v-else>Creating account...</span>
          <Icon
            v-if="!isPending"
            name="heroicons:arrow-right-20-solid"
            class="ml-2 size-5"
          />
        </UiButton>

        <div class="text-center text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink
            to="/auth/login"
            class="font-semibold text-primary hover:underline underline-offset-4"
          >
            Sign in
          </NuxtLink>
        </div>
      </UiCardFooter>
    </form>
  </UiCard>
</template>
