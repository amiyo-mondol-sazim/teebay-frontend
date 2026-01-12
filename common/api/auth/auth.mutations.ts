import type { LoginInput } from "~/features/auth/components/LoginForm/LoginForm.helpers";
import { client } from "../client";

const loginFn = async (input: LoginInput) => {
  const { data, error } = await client.POST("/api/v1/auth/sign-in", {
    body: { email: input.email, password: input.password },
  });
  if (error) {
    // @ts-expect-error - error type is complex
    throw new Error(error.error || "Login failed");
  }
  // @ts-expect-error - data type is complex
  if (!data?.accessToken || !data?.user) {
    throw new Error("Failed to login");
  }
  return {
    // @ts-expect-error - data type is complex
    token: data.accessToken,
    // @ts-expect-error - data type is complex
    user: data.user,
  };
};

const logoutFn = async () => {
  // Client-side only logout for now as API doesn't support it
  return Promise.resolve();
};

export const useLoginMutation = () => {
  const loginMutation = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      setAccessToken(data.token);
      navigateTo(PAGE_URLS.HOME);
      useAuthBroadcaster().broadcastLogin();
    },
  });
  return loginMutation;
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: logoutFn,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return logoutMutation;
};
