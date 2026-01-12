export const authQueryKeys = {
  all: ['auth'],
  user: () => [...authQueryKeys.all, 'user'],
  merchant: () => [...authQueryKeys.all, 'merchant'],
};
