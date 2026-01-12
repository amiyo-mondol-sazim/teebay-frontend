import { client } from '../client';
import { categoryQueryKeys } from './category.keys';

const getCategories = async () => {
  const { data, error } = await client.GET('/api/v1/merchant/categories');
  if (error || !data?.categories) throw new Error('Failed to fetch categories');
  return data.categories as Array<{ id: number; name: string }>;
};
const getSubCategories = async (categoryId: number) => {
  if (!categoryId) return [];

  const { data, error } = await client.GET(`/api/v1/merchant/sub_categories`, {
    params: { query: { category_id: categoryId } },
  });
  if (error || !data?.sub_categories) throw new Error('Failed to fetch subcategories');
  return data.sub_categories as Array<{ id: number; name: string }>;
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: categoryQueryKeys.list(),
    queryFn: () => getCategories(),
    staleTime: Infinity,
  });
};

export const useSubCategoriesQuery = (categoryId: MaybeRef<number | undefined>) => {
  return useQuery({
    queryKey: categoryQueryKeys.subCategories(categoryId),
    queryFn: () => getSubCategories(toValue(categoryId) as number),
    staleTime: Infinity,
  });
};
