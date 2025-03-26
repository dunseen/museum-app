import {
  type UndefinedInitialDataOptions,
  useQuery,
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

async function fetchLastPosts(params?: GetLastPostsParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      name: params?.name,
      status: params?.status ?? "all",
    },
  };

  const { data } = await api.get<PaginatedGetLastPostsApiResponse>(
    "dashboard/posts",
    requestConfig,
  );

  return data;
}
export const getLastPostsConfig = (
  params?: GetLastPostsParams,
  queryKey = GET_LAST_POSTS_QUERY_KEY,
): UndefinedInitialDataOptions<
  PaginatedGetLastPostsApiResponse,
  unknown,
  PaginatedGetLastPostsApiResponse,
  string[]
> => {
  return {
    initialData: undefined,
    queryKey: [queryKey, params as unknown as string],
    queryFn: () => fetchLastPosts(params),
  };
};

export function useGetLastPosts(params?: GetLastPostsParams) {
  return useQuery(getLastPostsConfig(params));
}
