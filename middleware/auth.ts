export default defineNuxtRouteMiddleware(async (data) => {
  const token = getAccessToken();

  if (!token && data.path !== PAGE_URLS.LOGIN) return navigateTo(PAGE_URLS.LOGIN);
});
