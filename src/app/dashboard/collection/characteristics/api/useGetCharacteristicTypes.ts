import {
  type DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { type AxiosRequestConfig } from 'axios';
import { type GetCharacteristicTypesApiResponse } from '~/app/museu/herbario/types/characteristic.types';
import { api } from '~/server/api';
import { type PaginationParams, type WithPagination } from '~/types/pagination';

export type PaginatedGetCharacteristicTypesApiResponse =
  WithPagination<GetCharacteristicTypesApiResponse>;

export type GetCharacteristicTypesParams = PaginationParams & {
  name?: string;
};

export const GET_CHARACTERISTIC_TYPES_QUERY_KEY = 'useGetCharacteristicsTypes';

const getCharacteristicsConfig = (
  params?: GetCharacteristicTypesParams,
  queryKey = GET_CHARACTERISTIC_TYPES_QUERY_KEY,
): DefinedInitialDataInfiniteOptions<
  PaginatedGetCharacteristicTypesApiResponse,
  unknown,
  GetCharacteristicTypesApiResponse[],
  string[]
> => {
  return {
    initialData: undefined,
    queryKey: [queryKey, params as unknown as string],
    queryFn: async ({ pageParam = 1, signal }) => {
      const requestConfig: AxiosRequestConfig = {
        params: {
          page: pageParam,
          limit: params?.limit ?? 10,
          name: params?.name ?? undefined,
        },
        signal,
      };

      const { data } =
        await api.get<PaginatedGetCharacteristicTypesApiResponse>(
          'dashboard/characteristic-types',
          requestConfig,
        );

      return data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.hasMore
        ? lastPage.pagination.nextPage
        : undefined;
    },
    initialPageParam: 1,
  };
};

export function useGetCharacteristicTypes(
  params?: GetCharacteristicTypesParams,
) {
  return useInfiniteQuery({
    ...getCharacteristicsConfig(params),
    select(data) {
      return data.pages.flatMap((p) => p.data);
    },
    staleTime: 1000 * 60 * 5,
  });
}
