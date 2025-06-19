import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { type SpecialistApiResponse } from "~/app/museu/herbario/types/specialist.types";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";

export type PaginatedGetSpecialistsApiResponse =
  WithPagination<SpecialistApiResponse>;

export type GetSpecialistsParams = PaginationParams & {
  name?: string;
  type?: "collector" | "determinator";
};

export const GET_SPECIALISTS_QUERY_KEY = "useGetSpecialists";

async function fetchSpecialists(params?: GetSpecialistsParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      name: params?.name ? params.name : undefined,
      type: params?.type,
    },
  };

  const { data } = await api.get<PaginatedGetSpecialistsApiResponse>(
    "dashboard/specialists",
    requestConfig,
  );

  return data;
}
export const getSpecialistsConfig = (
  params?: GetSpecialistsParams,
): UndefinedInitialDataOptions<
  PaginatedGetSpecialistsApiResponse,
  Error,
  PaginatedGetSpecialistsApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_SPECIALISTS_QUERY_KEY, JSON.stringify(params)],
    queryFn: () => fetchSpecialists(params),
  };
};

export function useGetSpecialists(params?: GetSpecialistsParams) {
  return useQuery({
    ...getSpecialistsConfig(params),
    staleTime: 1000 * 60 * 5,
  });
}
