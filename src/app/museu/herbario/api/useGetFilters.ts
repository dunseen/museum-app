import {
  type UndefinedInitialDataOptions,
  useQuery,
} from '@tanstack/react-query';
import { publicApi } from '~/server/api';

const GET_CHARACTERISTIC_FILTERS_KEY = 'useGetCharacteristicFilters';

export interface GetCharacteristicFiltersApiResponse {
  type: string;
  characteristics: {
    id: number;
    name: string;
  }[];
}

async function fetchFilters() {
  const { data } = await publicApi.get<GetCharacteristicFiltersApiResponse[]>(
    '/characteristics/home/filters',
  );

  return data;
}

export const getCharacteristicFilters = (): UndefinedInitialDataOptions<
  GetCharacteristicFiltersApiResponse[],
  Error,
  GetCharacteristicFiltersApiResponse[],
  string[]
> => {
  return {
    queryKey: [GET_CHARACTERISTIC_FILTERS_KEY],
    queryFn: fetchFilters,
  };
};

export function useGetCharacteristicFilters() {
  return useQuery(getCharacteristicFilters());
}
