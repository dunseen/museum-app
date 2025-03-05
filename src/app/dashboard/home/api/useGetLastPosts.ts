import {
  type DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import {
  type PostStatusFilter,
  type GetPostDetailsApiResponse,
} from "~/app/museu/herbario/types/post.types";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";

export type PaginatedGetLastPostsApiResponse =
  WithPagination<GetPostDetailsApiResponse>;

export type GetLastPostsParams = PaginationParams & {
  name?: string;
  status?: PostStatusFilter;
};

export const GET_LAST_POSTS_QUERY_KEY = "useGetLastPosts";

export const getLastPostsConfig = (
  params?: GetLastPostsParams,
  queryKey = GET_LAST_POSTS_QUERY_KEY,
): DefinedInitialDataInfiniteOptions<
  PaginatedGetLastPostsApiResponse,
  unknown,
  GetPostDetailsApiResponse[],
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
          name: params?.name,
          status: params?.status ?? "all",
        },
        signal,
      };

      const { data } = await api.get<PaginatedGetLastPostsApiResponse>(
        "dashboard/posts",
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

export function useGetLastPosts(params?: GetLastPostsParams) {
  return useInfiniteQuery({
    ...getLastPostsConfig(params),
    select(data) {
      return data.pages.flatMap((p) => p.data);
    },
  });
}
