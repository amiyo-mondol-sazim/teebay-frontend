import { ref, onMounted, onUnmounted } from "vue";

const checkMobile = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  return false;
};

export const useConversationsState = () => {
  const activeConversationId = ref<number | null>(null);
  const isMobileListVisible = ref(true);
  const isMobile = ref(false);

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
