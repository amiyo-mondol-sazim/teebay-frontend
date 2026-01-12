<script setup lang="ts">
import { NuxtLink } from '#components';
import { useIsFormDirty } from 'vee-validate';

const emits = defineEmits<{ saveAsDraft: [] }>();

const isDirty = useIsFormDirty();
</script>

<template>
  <header class="flex h-20 w-full items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
    <div class="flex items-center gap-2">
      <ConfirmationModal
        v-if="isDirty"
        title="Discard offer?"
        description="Are you sure you want to discard the offer and return to home?"
        action-text="Save as Draft"
        cancel-text="Discard Offer"
        @cancel="navigateTo(PAGE_URLS.HOME)"
        @action="emits('saveAsDraft')"
      >
        <UiButton variant="ghost" size="icon">
          <Icon name="ph:x-bold" class="text-foreground/45 size-6" />
        </UiButton>
        <template #cancel>
          <UiButton
            variant="ghost"
            class="text-destructive hover:text-destructive hover:bg-destructive/10 h-10.5 bg-transparent [background-image:none] px-5 font-semibold shadow-none"
          >
            Discard Offer
          </UiButton>
        </template>
      </ConfirmationModal>
      <UiButton v-else variant="ghost" size="icon" :as="NuxtLink" :to="PAGE_URLS.HOME">
        <Icon name="ph:x-bold" class="text-foreground/45 size-6" />
      </UiButton>
      <h1 class="text-2xl font-semibold">New Offer</h1>
    </div>
    <div class="p-2">
      <ConfirmationModal
        title="Save as Draft?"
        description="The offer will be saved in drafts so you can continue editing later."
        action-text="Save as Draft"
        @action="emits('saveAsDraft')"
      >
        <UiButton
          variant="outline"
          type="button"
          :disabled="!isDirty"
          class="h-10 gap-1.5 rounded-[0.5625rem] border-none bg-white bg-gradient-to-b from-transparent from-0% to-black/[0.08] to-100% p-3 px-3 text-sm font-semibold shadow-[0px_2px_3px_0px_rgba(12,21,30,0.08)] outline-1 outline-black/[0.08] outline-solid"
        >
          <Icon name="ph:clock" class="size-5" /> Save as Draft
        </UiButton>
      </ConfirmationModal>
    </div>
  </header>
</template>
