export const authQueryKeys = {
  all: ["auth"],
  user: () => [...authQueryKeys.all, "user"],
};
