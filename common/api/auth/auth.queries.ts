import { client } from "../client";
import { authKeys } from "./auth.keys";

const getUser = async () => {
  const { data, error } = await client.GET("/api/v1/users/me");
  if (error || !data) {
    toast.error(error?.message || "Failed to fetch user");
    throw new Error("Failed to fetch user");
  }
  return data;
};

export const useUserQuery = () => {
  return useQuery({ queryKey: authKeys.user(), queryFn: getUser });
};
