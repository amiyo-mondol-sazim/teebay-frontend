import type { TLoginInput } from "~/features/auth/components/LoginForm/LoginForm.helpers";
import type { TRegisterInput } from "~/features/auth/components/RegisterForm/RegisterForm.helpers";
import { client } from "../client";

const registerFn = async (input: TRegisterInput) => {
  const { data, error } = await client.POST("/api/v1/auth/sign-up", {
    body: {
      userProfile: {
        firstName: input.firstName,
        lastName: input.lastName,
      },
      email: input.email,
      password: input.password,
    },
  });

  if (error) {
    throw new Error(error.message || "Registration failed");
  }

  if (!data) {
    throw new Error("Failed to register");
  }
  return data;
};

const loginFn = async (input: TLoginInput) => {
  const { data, error } = await client.POST("/api/v1/auth/sign-in", {
    body: {
      email: input.email,
      password: input.password,
    },
  });

  if (error) {
    throw new Error(error.message || "Login failed");
  }

  if (!data?.accessToken || !data?.user) {
    throw new Error("Failed to login");
  }
  return {
    token: data.accessToken,
    user: data.user,
  };
};

const logoutFn = async () => {
  removeAccessToken();
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

export const useRegisterMutation = () => {
  const loginMutation = useMutation({
    mutationFn: registerFn,
    onSuccess: () => {
      toast("Registration successful. Please log in.");
      navigateTo("/auth/login");
    },
  });
  return loginMutation;
};
