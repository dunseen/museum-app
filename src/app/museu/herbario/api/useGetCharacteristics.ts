import { useQuery } from '@tanstack/react-query';
import { publicApi } from '~/server/api';
import { type WithPagination } from '~/types/pagination';

export type GetCharacteristicsApiResponse = {
  id: number;
  name: string;
  type: {
    id: number;
    name: string;
  };
  files: {
    id: string;
    path: string;
    url: string;
  }[];
};
export type PaginatedGetCharacteristicsApiResponse =
  WithPagination<GetCharacteristicsApiResponse>;

export type CharacteristicParams = {
  typeIds?: number[];
  name?: string;
};

export const GET_CHARACTERISTICS_KEY = 'characteristics';

async function fetchCharacteristics(
  params?: CharacteristicParams,
  signal?: AbortSignal,
) {
  const { data } = await publicApi.get<PaginatedGetCharacteristicsApiResponse>(
    '/characteristics',
    {
      params: {
        ...(!!params?.typeIds?.length
          ? { characteristicTypeIds: params.typeIds.join(',') }
          : {}),
        ...(params?.name ? { name: params.name } : {}),
      },
      signal,
    },
  );

  return data;
}

export function useGetCharacteristics(
  enabled: boolean,
  params?: CharacteristicParams,
) {
  return useQuery({
    enabled,
    queryKey: [GET_CHARACTERISTICS_KEY, params],
    queryFn: ({ signal }) => fetchCharacteristics(params, signal),
  });
}
