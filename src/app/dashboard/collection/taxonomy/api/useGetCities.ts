import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";
import { GetCitiesApiResponse } from "../types";

export type PaginatedGetCitiesApiResponse =
  WithPagination<GetCitiesApiResponse>;

export type GetCitiesParams = PaginationParams & {
  name?: string;
};

export const GET_CITIES_QUERY_KEY = "useGetCities";

async function fetchCities(params?: GetCitiesParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      name: params?.name ? params.name : undefined,
    },
  };

  const { data } = await api.get<PaginatedGetCitiesApiResponse>(
    "cities",
    requestConfig,
  );
  return data;
}
export const getCitiesConfig = (
  params?: GetCitiesParams,
): UndefinedInitialDataOptions<
  PaginatedGetCitiesApiResponse,
  Error,
  PaginatedGetCitiesApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_CITIES_QUERY_KEY, JSON.stringify(params)],
    queryFn: () => fetchCities(params),
  };
};

export function useGetCities(params?: GetCitiesParams) {
  return useQuery({
    ...getCitiesConfig(params),
    staleTime: 1000 * 60 * 5,
  });
}
