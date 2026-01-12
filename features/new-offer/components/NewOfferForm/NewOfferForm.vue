<script setup lang="ts">
import type { UiScrollArea } from '#components';
import { FORM_TABS } from '../NewOfferFormTabs/NewOfferFormTabs.constants';
import { ENewOfferFormTab } from '../NewOfferFormTabs/NewOfferFormTabs.enums';
import { useNewOfferForm } from './NewOfferForm.composables';

const { currentTab, onSubmit, saveAsDraft } = useNewOfferForm();
const formRef = useTemplateRef<HTMLFormElement>('formRef');
const scrollAreaRef = useTemplateRef<typeof UiScrollArea>('scrollAreaRef');
const tabIndex = computed(() => FORM_TABS.findIndex((tab) => tab.value === currentTab.value));

const goToPrevTab = () => {
  currentTab.value = FORM_TABS[tabIndex.value - 1]?.value ?? ENewOfferFormTab.BASIC_DETAILS;
  scrollAreaRef.value?.scrollToTop();
};
const goToNextTab = () => {
  currentTab.value = FORM_TABS[tabIndex.value + 1]?.value ?? ENewOfferFormTab.REVIEW;
  scrollAreaRef.value?.scrollToTop();
};
const goToTab = (tab: ENewOfferFormTab) => {
  currentTab.value = tab;
  scrollAreaRef.value?.scrollToTop();
};
</script>

<template>
  <div class="relative h-screen">
    <NewOfferFormHeader @save-as-draft="saveAsDraft" />
    <UiTabs :model-value="currentTab" class="container mx-auto">
      <div class="flex flex-row justify-start gap-10 xl:gap-25">
        <aside class="relative w-55 flex-shrink-0">
          <div class="sticky pt-45">
            <NewOfferFormTabs @tab-change="goToTab" />
          </div>
        </aside>
        <form
          ref="formRef"
          class="relative block w-full"
          :class="currentTab === ENewOfferFormTab.REVIEW ? 'max-w-240' : 'max-w-180'"
          @submit="onSubmit"
        >
          <UiScrollArea ref="scrollAreaRef" class="h-[calc(100vh-10rem)] overflow-hidden">
            <div class="px-10 pt-12 pb-6">
              <div v-show="currentTab === ENewOfferFormTab.BASIC_DETAILS">
                <StepBasicDetails />
              </div>
              <div v-show="currentTab === ENewOfferFormTab.TARGETING">
                <StepOfferTargeting />
              </div>
              <div v-show="currentTab === ENewOfferFormTab.ASSETS">
                <StepOfferAssets />
              </div>
              <div v-show="currentTab === ENewOfferFormTab.REVIEW">
                <StepOfferReview @go-to-first-tab="goToTab(ENewOfferFormTab.BASIC_DETAILS)" />
              </div>
            </div>
          </UiScrollArea>
        </form>
      </div>
    </UiTabs>
    <div class="absolute inset-x-0 bottom-0 border-t bg-white shadow-sm">
      <div class="container mx-auto">
        <div class="flex flex-row justify-start gap-10 xl:gap-25">
          <div class="w-55 flex-shrink-0" />
          <div class="flex max-w-180 flex-1 justify-end gap-2 px-10 py-4">
            <UiButton
              variant="ghost"
              type="button"
              class="h-10.5 w-30 text-base text-gray-100"
              :disabled="tabIndex < 1"
              @click="goToPrevTab"
            >
              <Icon name="ph:arrow-left-bold" /> Back
            </UiButton>
            <UiButton
              v-if="tabIndex < FORM_TABS.length - 1"
              variant="primary"
              class="h-10.5 w-30 text-base"
              type="button"
              @click="goToNextTab"
            >
              Next
              <Icon name="ph:arrow-right-bold" />
            </UiButton>
            <UiButton
              v-else
              variant="primary"
              class="h-10.5 w-30 text-base"
              type="button"
              @click="formRef?.requestSubmit()"
            >
              Submit <Icon name="ph:arrow-right-bold" />
            </UiButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
