import type { TOffersQueryParams } from '../../typedefs/query';
import { client } from '../client';
import { offerQueryKeys } from './offer.keys';

const getOffers = async (params: TOffersQueryParams) => {
  const { data, error } = await client.GET('/api/v1/merchant/offers', {
    params: {
      query: {
        page: params.page,
        per_page: params.per_page,
        status: params.status,
      },
    },
  });

  if (error || !data) throw new Error('Failed to fetch offers');

  return {
    offers: data.offers!,
    pagination: data.pagination!,
    status_counts: data.status_counts!,
    metrics: data.metrics!,
  };
};

const getOfferDetails = async (id: number) => {
  const { data, error } = await client.GET(`/api/v1/merchant/offers/{id}`, { params: { path: { id } } });
  if (error || !data) throw new Error('Failed to fetch offer details');
  return data;
};

export const useOffersInfiniteQuery = (params: TOffersQueryParams) => {
  return useInfiniteQuery({
    queryKey: offerQueryKeys.list(params),
    queryFn: ({ pageParam }) => getOffers({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => lastPage?.pagination?.next_page,
    getPreviousPageParam: (firstPage) => firstPage?.pagination?.previous_page,
    select: (data) => data.pages.flatMap((page) => page.offers),
    initialPageParam: 1,
  });
};

export const useOfferStatusCountQuery = () => {
  return useQuery({
    queryKey: offerQueryKeys.statusCount(),
    queryFn: () => getOffers({ page: 1, per_page: 1, status: 'active' }),
    select: (data) => data.status_counts,
  });
};

export const useOfferDetailsQuery = (id: MaybeRef<number | null | undefined>) => {
  return useQuery({
    queryKey: offerQueryKeys.detail(id as number),
    queryFn: () => getOfferDetails(toValue(id) as number),
    enabled: !!toValue(id),
  });
};

export const useInsightsQuery = () => {
  return useQuery({
    queryKey: offerQueryKeys.insights(),
    queryFn: () => getOffers({ page: 1, per_page: 1, status: 'active' }),
    select: (data) => data.metrics,
  });
};
