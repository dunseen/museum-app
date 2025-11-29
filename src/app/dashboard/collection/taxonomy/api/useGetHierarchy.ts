import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { type GetTaxonsApiResponse } from "~/app/museu/herbario/types/taxonomy.types";
import { api } from "~/server/api";
import { type PaginationParams } from "~/types/pagination";

export type GetHierarchyParams = PaginationParams & {
  name?: string;
};

export const GET_HIERARCHIES_QUERY_KEY = "useGetHierarchies";

async function fetchHierarchies(params?: GetHierarchyParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      name: params?.name ?? undefined,
    },
  };

  const { data } = await api.get<GetTaxonsApiResponse[]>(
    "hierarchies",
    requestConfig,
  );

  return data;
}
export const getHierarchiesConfig = (
  params?: GetHierarchyParams,
): UndefinedInitialDataOptions<
  GetTaxonsApiResponse[],
  Error,
  GetTaxonsApiResponse[],
  string[]
> => {
  return {
    queryKey: [GET_HIERARCHIES_QUERY_KEY, JSON.stringify(params)],
    queryFn: () => fetchHierarchies(params),
    staleTime: 1000 * 60 * 5,
  };
};

export function useGetHierarchies(params?: GetHierarchyParams) {
  return useQuery(getHierarchiesConfig(params));
}
