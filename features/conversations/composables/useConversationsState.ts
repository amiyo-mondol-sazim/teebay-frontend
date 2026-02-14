import { onMounted, onUnmounted, ref } from "vue";

const checkMobile = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  return false;
};

export const activeConversationId = ref<number | null>(null);
export const isMobileListVisible = ref(true);
export const isMobile = ref(false);

export const useConversationsState = () => {
  const handleResize = () => {
    isMobile.value = checkMobile();
  };

  onMounted(() => {
    isMobile.value = checkMobile();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  const handleSelectConversation = (id: number) => {
    activeConversationId.value = id;
    if (isMobile.value) {
      isMobileListVisible.value = false;
    }
  };

  const handleShowList = () => {
    isMobileListVisible.value = true;
  };

  return {
    activeConversationId,
    isMobileListVisible,
    isMobile,
    handleSelectConversation,
    handleShowList,
  };
};
