export const brandQueryKeys = {
  all: ['brands'],
  lists: () => [...brandQueryKeys.all, 'list'],
  list: (params: Record<string, unknown>) => [...brandQueryKeys.lists(), params],
};
