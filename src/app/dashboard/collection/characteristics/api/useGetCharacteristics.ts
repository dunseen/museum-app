import {
  type UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';
import { type AxiosRequestConfig } from 'axios';
import { type GetCharacteristicApiResponse } from '~/app/museu/herbario/types/characteristic.types';
import { api } from '~/server/api';
import { type PaginationParams, type WithPagination } from '~/types/pagination';

export type PaginatedGetCharacteristicsApiResponse =
  WithPagination<GetCharacteristicApiResponse>;

export type GetCharacteristicsParams = PaginationParams & {
  name?: string;
};

export const GET_CHARACTERISTICS_QUERY_KEY = 'useGetCharacteristics';

async function fetchCharacteristics(params?: GetCharacteristicsParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      name: params?.name ?? undefined,
    },
  };

  const { data } = await api.get<PaginatedGetCharacteristicsApiResponse>(
    'dashboard/characteristics',
    requestConfig,
  );

  return data;
}
export const getCharacteristicsConfig = (
  params?: GetCharacteristicsParams,
): UndefinedInitialDataOptions<
  PaginatedGetCharacteristicsApiResponse,
  Error,
  PaginatedGetCharacteristicsApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_CHARACTERISTICS_QUERY_KEY, JSON.stringify(params)],
    queryFn: () => fetchCharacteristics(params),
  };
};

export function useGetCharacteristics(params?: GetCharacteristicsParams) {
  return useQuery({
    ...getCharacteristicsConfig(params),
    staleTime: 1000 * 60 * 5,
  });
}
