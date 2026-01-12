import createClient, { type Middleware } from 'openapi-fetch';
import type { paths } from '~/common/typedefs/api-schema';
import { setAccessToken } from '../utils/token';

const client = createClient<paths>({ baseUrl: useRuntimeConfig().public.apiBaseUrl });

const authMiddleware: Middleware = {
  onRequest: async ({ request }) => {
    const token = getAccessToken();
    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`);
    }
  },
  onResponse: async ({ response }) => {
    if (response.status === 401) {
      setAccessToken(null);
      useAuthBroadcaster().broadcastLogout();
    }
  },
};

client.use(authMiddleware);

export { client };
