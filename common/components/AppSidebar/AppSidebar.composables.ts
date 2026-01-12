import { useAuthBroadcaster } from '../../composables/useAuthBroadcaster';

export const useAuthActions = () => {
  const { mutate: logoutFn } = useLogoutMutation();
  const { broadcastLogout } = useAuthBroadcaster();

  const logout = () => {
    logoutFn(undefined, {
      onSuccess: broadcastLogout,
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return { logout };
};
