import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";
import { GetStatesApiResponse } from "../types";

export type PaginatedGetStatesApiResponse =
  WithPagination<GetStatesApiResponse>;

export type GetStatesParams = PaginationParams & {
  name?: string;
};

export const GET_STATES_QUERY_KEY = "useGetStates";

async function fetchTaxons(params?: GetStatesParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      name: params?.name ? params.name : undefined,
    },
  };

  const { data } = await api.get<PaginatedGetStatesApiResponse>(
    "states",
    requestConfig,
  );

  return data;
}
export const getStatesConfig = (
  params?: GetStatesParams,
): UndefinedInitialDataOptions<
  PaginatedGetStatesApiResponse,
  Error,
  PaginatedGetStatesApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_STATES_QUERY_KEY, JSON.stringify(params)],
    queryFn: () => fetchTaxons(params),
  };
};

export function useGetStates(params?: GetStatesParams) {
  return useQuery({
    ...getStatesConfig(params),
    staleTime: 1000 * 60 * 5,
  });
}
