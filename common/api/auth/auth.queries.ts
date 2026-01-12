import { client } from '../client';
import { authQueryKeys } from './auth.keys';

const getMerchant = async () => {
  const { data, error } = await client.GET('/api/v1/merchant');
  if (error || !data) {
    throw new Error('Failed to fetch merchant');
  }
  return data;
};

export const useMerchantQuery = () => {
  return useQuery({
    queryKey: authQueryKeys.merchant(),
    queryFn: getMerchant,
  });
};

const getUser = async () => {
  const { data, error } = await client.GET('/api/v1/merchant/me');
  if (error || !data) {
    throw new Error('Failed to fetch user');
  }
  return data;
};

export const useUserQuery = () => {
  return useQuery({ queryKey: authQueryKeys.user(), queryFn: getUser });
};
