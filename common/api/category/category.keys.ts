export const categoryQueryKeys = {
  all: ['categories'],
  lists: () => [...categoryQueryKeys.all, 'list'],
  list: () => [...categoryQueryKeys.lists()],
  subCategories: (categoryId: MaybeRef<number | null | undefined>) => [
    ...categoryQueryKeys.all,
    'subCategories',
    categoryId,
  ],
  detail: (id: MaybeRef<number | null | undefined>) => [...categoryQueryKeys.all, 'detail', id],
};
