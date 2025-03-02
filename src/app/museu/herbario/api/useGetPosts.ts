import {
  type DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";

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
    }[];
    taxonomy: Record<string, string>;
  };
};

export type GetPostApiResponse = {
  data: Post[];
};

export type PaginatedGetpostsApiResponse = WithPagination<GetPostApiResponse>;

type GetPostParams = PaginationParams & {
  name?: string;
};

export const GET_POST_QUERY_KEY = "posts";

export const getPostQueryConfig = (
  params?: GetPostParams,
): DefinedInitialDataInfiniteOptions<
  PaginatedGetpostsApiResponse,
  unknown,
  Post[],
  string[]
> => {
  return {
    initialData: undefined,
    queryKey: [GET_POST_QUERY_KEY, params as unknown as string],
    queryFn: async ({ pageParam = 1, signal }) => {
      const requestConfig: AxiosRequestConfig = {
        params: {
          page: pageParam,
          limit: params?.limit ?? 10,
          name: params?.name,
        },
        signal,
      };

      const { data } = await api.get<PaginatedGetpostsApiResponse>(
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
