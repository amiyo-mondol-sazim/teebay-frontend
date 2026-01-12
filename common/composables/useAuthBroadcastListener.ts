export function useAuthBroadcastListener() {
  const bc = useAuthBroadcaster();
  const route = useRoute();

  const onLoginCleanup = bc.onLogin(() => {
    window.location.reload();
  });

  const onLogoutCleanup = bc.onLogout(
    () => {
      if (route.path !== PAGE_URLS.LOGIN) {
        navigateTo(PAGE_URLS.LOGIN);
      }
    },
    { allowSelf: true },
  );

  onBeforeUnmount(() => {
    onLoginCleanup();
    onLogoutCleanup();
  });
}
