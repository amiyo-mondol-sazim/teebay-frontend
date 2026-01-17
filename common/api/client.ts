import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "~/common/typedefs/api-schema";
import { getAccessToken, setAccessToken } from "../utils/token";

const client = createClient<paths>({
  baseUrl: useRuntimeConfig().public.apiBaseUrl,
});

const authMiddleware: Middleware = {
  onRequest: async ({ request }) => {
    const token = getAccessToken();
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
  },
  onResponse: async ({ response }) => {
    if (response.status === 401) {
      setAccessToken(null);
      useAuthBroadcaster().broadcastLogout();
    }

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");

    if (response.ok && isJson) {
      const clone = response.clone();
      const body = await clone.json();

      const validResponse =
        body &&
        typeof body === "object" &&
        "data" in body &&
        "statusCode" in body;

      if (validResponse) {
        return new Response(JSON.stringify(body.data), {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        });
      }
    }

    return response;
  },
};

client.use(authMiddleware);

export { client };
