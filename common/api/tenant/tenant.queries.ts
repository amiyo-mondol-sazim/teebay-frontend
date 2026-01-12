import type { TTenantsQueryParams } from '~/common/typedefs/api';
import { client } from '../client';
import { tenantQueryKeys } from './tenant.keys';

const getTenants = async ({ page, per_page }: TTenantsQueryParams) => {
  const { data, error } = await client.GET('/api/v1/merchant/tenants', { params: { query: { page, per_page } } });

  if (error || !data?.tenants) throw error;

  return {
    tenants: data.tenants as Array<{ id: number; name: string }>,
    pagination: data.pagination!,
  };
};

export const useTenantsInfiniteQuery = (params: TTenantsQueryParams) => {
  return useInfiniteQuery({
    queryKey: tenantQueryKeys.list(params),
    queryFn: ({ pageParam }) => getTenants({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.pagination?.next_page,
    getPreviousPageParam: (firstPage) => firstPage.pagination?.previous_page,
    staleTime: Infinity,
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((page) => page.tenants),
  });
};
