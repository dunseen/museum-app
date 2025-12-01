import {
  type UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';
import { api } from '~/server/api';
import { type GetStatesApiResponse } from '../../taxonomy/types';

export const GET_STATES_QUERY_KEY = 'useGetStates';

async function fetchStates() {
  const { data } = await api.get<GetStatesApiResponse[]>('states');

  return data;
}
export const getStatesConfig = (): UndefinedInitialDataOptions<
  GetStatesApiResponse[],
  Error,
  GetStatesApiResponse[],
  string[]
> => {
  return {
    queryKey: [GET_STATES_QUERY_KEY],
    queryFn: fetchStates,
    staleTime: 1000 * 60 * 5,
  };
};

export function useGetStates() {
  return useQuery(getStatesConfig());
}
