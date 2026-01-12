import { client } from "../client";
import { authQueryKeys } from "./auth.keys";

const getUser = async () => {
  const { data, error } = await client.GET("/api/v1/users/me");
  if (error || !data) {
    throw new Error("Failed to fetch user");
  }
  return data;
};

export const useUserQuery = () => {
  return useQuery({ queryKey: authQueryKeys.user(), queryFn: getUser });
};
