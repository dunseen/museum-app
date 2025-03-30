import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { type GetTaxonsApiResponse } from "~/app/museu/herbario/types/taxonomy.types";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";

export type PaginatedGetTaxonsApiResponse =
  WithPagination<GetTaxonsApiResponse>;

export type GetTaxonsParams = PaginationParams & {
  name?: string;
  hierarchyId: string;
};

export const GET_TAXONS_QUERY_KEY = "useGetTaxons";

async function fetchTaxons(params?: GetTaxonsParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      name: params?.name ? params.name : undefined,
      hierarchyId: Number(params?.hierarchyId),
    },
  };

  const { data } = await api.get<PaginatedGetTaxonsApiResponse>(
    "dashboard/taxons",
    requestConfig,
  );

  return data;
}
export const getTaxonsConfig = (
  params?: GetTaxonsParams,
): UndefinedInitialDataOptions<
  PaginatedGetTaxonsApiResponse,
  Error,
  PaginatedGetTaxonsApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_TAXONS_QUERY_KEY, JSON.stringify(params)],
    queryFn: () => fetchTaxons(params),
  };
};

export function useGetTaxons(params?: GetTaxonsParams) {
  return useQuery({
    ...getTaxonsConfig(params),
    staleTime: 1000 * 60 * 5,
  });
}
