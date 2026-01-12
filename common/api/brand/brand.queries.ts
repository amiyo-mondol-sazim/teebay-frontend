import type { TBrandsQueryParams } from '../../typedefs/query';
import { client } from '../client';
import { brandQueryKeys } from './brand.keys';

export const useBrandsInfiniteQuery = (params: { search: MaybeRef<string>; minSearchLength: number }) => {
  const getBrands = async (params: TBrandsQueryParams, minSearchLength: number) => {
    const defaultResponse = {
      data: [],
      pagination: {
        current_page: params.page ?? 1,
        next_page: null,
        previous_page: null,
        total_pages: 0,
        per_page: params.per_page ?? 10,
        total_entries: 0,
      },
    };

    if (!params.search?.length || params.search.trim().length < minSearchLength) {
      return defaultResponse;
    }

    const { data, error, response } = await client.GET('/api/v1/merchant/brands', {
      params: { query: { search: params.search ?? '', page: params.page, per_page: params.per_page } },
    });
    if (error && response.status == 422) return defaultResponse;
    if (error || !data?.brands || !data.pagination) throw new Error('Failed to fetch brands');

    return {
      data: data.brands.filter((b) => b.id && b.name) as Array<{ id: number; name: string }>,
      pagination: data.pagination,
    };
  };

  return useInfiniteQuery({
    queryKey: brandQueryKeys.list({ search: params.search }),
    queryFn: ({ pageParam }) => getBrands({ search: toValue(params.search), page: pageParam }, params.minSearchLength),
    getNextPageParam: (lastPage) => lastPage.pagination.next_page,
    getPreviousPageParam: (firstPage) => firstPage.pagination.previous_page,
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.data),
  });
};
