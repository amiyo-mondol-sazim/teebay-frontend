export default defineNuxtRouteMiddleware(async () => {
  const token = getAccessToken();
  if (token) return navigateTo(PAGE_URLS.HOME);
});
