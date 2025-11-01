import {
  type DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { publicApi } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";
import { type GetTaxonApiResponse } from "../types/taxonomy.types";

export type Post = {
  id: string;
  specie: {
    id: number;
    scientificName: string;
    commonName: string;
    description: string;
    files: {
      id: string;
      path: string;
      url: string;
    }[];
    taxons: GetTaxonApiResponse[];
  };
};

export type PaginatedGetPostsApiResponse = WithPagination<Post>;

export type PostSearchParams = {
  name?: string;
  characteristics?: string[];
  orderHierarchyId?: number;
  orderName?: string;
  familyHierarchyId?: number;
  familyName?: string;
  genusHierarchyId?: number;
  genusName?: string;
};

export type GetPostParams = PaginationParams & PostSearchParams;

export const GET_POST_QUERY_KEY = "posts";

function sanitizeParams(value: string | number | undefined) {
  if (!value) return undefined;

  return value;
}
export const getPostQueryConfig = (
  params?: GetPostParams,
  queryKey = GET_POST_QUERY_KEY,
): DefinedInitialDataInfiniteOptions<
  PaginatedGetPostsApiResponse,
  unknown,
  Post[],
  string[]
> => {
  return {
    initialData: undefined,
    queryKey: [queryKey, params as unknown as string],
    queryFn: async ({ pageParam = 1, signal }) => {
      const requestConfig: AxiosRequestConfig = {
        params: {
          page: pageParam,
          limit: params?.limit ?? 100,
          name: sanitizeParams(params?.name),
          characteristicIds: params?.characteristics?.length
            ? params?.characteristics.join(",")
            : undefined,
          familyHierarchyId: sanitizeParams(params?.familyHierarchyId),
          familyName: sanitizeParams(params?.familyName),
          genusHierarchyId: sanitizeParams(params?.genusHierarchyId),
          genusName: sanitizeParams(params?.genusName),
          orderHierarchyId: sanitizeParams(params?.orderHierarchyId),
          orderName: sanitizeParams(params?.orderName),
        },
        signal,
      };

      const { data } = await publicApi.get<PaginatedGetPostsApiResponse>(
        "posts/species",
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

export function useGetPosts(params?: GetPostParams) {
  return useInfiniteQuery({
    ...getPostQueryConfig(params),
    select(data) {
      return data.pages.flatMap((p) => p.data);
    },
    staleTime: 1000 * 60 * 5,
  });
}
