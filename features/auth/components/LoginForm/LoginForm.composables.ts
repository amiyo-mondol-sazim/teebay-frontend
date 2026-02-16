import { useForm } from "vee-validate";
import { loginFormSchema } from "./LoginForm.helpers";

export function useLoginForm() {
  return useForm({
    validationSchema: loginFormSchema,
    initialValues: {
      email: "",
      password: "",
    },
  });
}

export function useLogin() {
  const { mutate: loginFn, isPending } = useLoginMutation();
  const { onLogin } = useAuthBroadcaster();

  const login = (params: Parameters<typeof loginFn>[0]) => {
    loginFn(params, {
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const cleanupLogin = onLogin(() => {
    window.location.reload();
  });

  onBeforeUnmount(() => {
    cleanupLogin();
  });

  return { login, isPending };
}
