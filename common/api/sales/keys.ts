export const salesKeys = {
  all: ["sales"],
  bought: (userId: number) => [...salesKeys.all, "bought", userId],
  sold: (userId: number) => [...salesKeys.all, "sold", userId],
};
