import {
  type UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';
import { api } from '~/server/api';
import { type GetCitiesApiResponse } from '../../taxonomy/types';

type GetCitiesParams = {
  stateId?: number;
};
export const GET_CITIES_QUERY_KEY = 'useGetCities';

async function fetchCities(params?: GetCitiesParams) {
  const { data } = await api.get<GetCitiesApiResponse[]>('cities', {
    params: {
      stateId: params?.stateId,
    },
  });

  return data;
}
export const getCitiesConfig = (
  params?: GetCitiesParams,
): UndefinedInitialDataOptions<
  GetCitiesApiResponse[],
  Error,
  GetCitiesApiResponse[],
  string[]
> => {
  return {
    queryKey: [GET_CITIES_QUERY_KEY, params as string],
    queryFn: () => fetchCities(params),
    staleTime: 1000 * 60 * 5,
    enabled: !!params?.stateId,
  };
};

export function useGetCities(params?: GetCitiesParams) {
  return useQuery(getCitiesConfig(params));
}
