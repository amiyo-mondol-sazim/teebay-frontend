import type { TTenantsQueryParams } from '~/common/typedefs/api';

export const tenantQueryKeys = {
  all: ['banks'],
  lists: () => [...tenantQueryKeys.all, 'list'],
  list: (params: TTenantsQueryParams) => [...tenantQueryKeys.lists(), params],
};
