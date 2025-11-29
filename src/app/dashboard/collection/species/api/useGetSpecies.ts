import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";

export type PaginatedGetSpeciesApiResponse =
  WithPagination<GetSpecieApiResponse>;

export type GetSpeciesParams = PaginationParams & {
  name?: string;
};

export const GET_SPECIES_QUERY_KEY = "useGetSpecies";

async function fetchSpecies(params?: GetSpeciesParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      name: params?.name ?? undefined,
    },
  };

  const { data } = await api.get<PaginatedGetSpeciesApiResponse>(
    "dashboard/species",
    requestConfig,
  );

  return data;
}
export const getSpeciesConfig = (
  params?: GetSpeciesParams,
): UndefinedInitialDataOptions<
  PaginatedGetSpeciesApiResponse,
  Error,
  PaginatedGetSpeciesApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_SPECIES_QUERY_KEY, JSON.stringify(params)],
    queryFn: () => fetchSpecies(params),
  };
};

export function useGetSpecies(params?: GetSpeciesParams) {
  return useQuery({
    ...getSpeciesConfig(params),
    staleTime: 1000 * 60 * 5,
  });
}
