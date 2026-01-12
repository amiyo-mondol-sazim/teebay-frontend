import type { TOffer } from '../../typedefs/api';
import type { TOffersQueryParams } from '../../typedefs/query';

export const offerQueryKeys = {
  all: ['offers'],
  lists: () => [...offerQueryKeys.all, 'list'],
  list: (params: TOffersQueryParams) => [...offerQueryKeys.lists(), params],
  detail: (id: TOffer['id']) => [...offerQueryKeys.all, 'detail', id],
  insights: () => [...offerQueryKeys.all, 'insights'],
  statusCount: () => [...offerQueryKeys.all, 'status-count'],
};
