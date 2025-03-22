import {
  type DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { type GetCharacteristicApiResponse } from "~/app/museu/herbario/types/characteristic.types";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";

export type PaginatedGetCharacteristicsApiResponse =
  WithPagination<GetCharacteristicApiResponse>;

export type GetCharacteristicsParams = PaginationParams & {
  name?: string;
};

export const GET_CHARACTERISTICS_QUERY_KEY = "useGetCharacteristics";

export const getCharacteristicsConfig = (
  params?: GetCharacteristicsParams,
  queryKey = GET_CHARACTERISTICS_QUERY_KEY,
): DefinedInitialDataInfiniteOptions<
  PaginatedGetCharacteristicsApiResponse,
  unknown,
  GetCharacteristicApiResponse[],
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
          name: params?.name ? params.name : undefined,
        },
        signal,
      };

      const { data } = await api.get<PaginatedGetCharacteristicsApiResponse>(
        "dashboard/characteristics",
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

export function useGetCharacteristics(params?: GetCharacteristicsParams) {
  return useInfiniteQuery({
    ...getCharacteristicsConfig(params),
    select(data) {
      return data.pages.flatMap((p) => p.data);
    },
    staleTime: 1000 * 60 * 5,
  });
}
