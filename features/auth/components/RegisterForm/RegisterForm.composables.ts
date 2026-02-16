import { useForm } from "vee-validate";
import { useRegisterMutation } from "~/common/api/auth/auth.mutations";
import { validationSchema, type TRegisterInput } from "./RegisterForm.helpers";

export const useRegisterForm = () => {
  return useForm({
    validationSchema,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
};

export const useRegister = () => {
  const { mutate, isPending } = useRegisterMutation();

  const register = (values: TRegisterInput) => {
    mutate(
      {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      },
      {
        onSuccess: () => {
          toast.success("Registration successful. Please log in.");
          navigateTo("/auth/login");
        },
      },
    );
  };

  return {
    register,
    isPending,
  };
};
