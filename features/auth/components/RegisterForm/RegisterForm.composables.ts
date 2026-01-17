import { useForm } from "vee-validate";
import { useRegisterMutation } from "~/common/api/auth/auth.mutations";
import { validationSchema, type RegisterInput } from "./RegisterForm.helpers";

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

  const register = (values: RegisterInput) => {
    mutate({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return {
    register,
    isPending,
  };
};
