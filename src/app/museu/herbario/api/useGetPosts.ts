import { useInfiniteQuery } from "@tanstack/react-query";
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

type GetPostParams = PaginationParams;

export const GET_POST_QUERY_KEY = "posts";

export const getPosts = async (params?: GetPostParams) => {
  const { data } = await api.get<PaginatedGetpostsApiResponse>("posts", {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
    },
  });
  return data;
};

export function useGetPosts(params?: GetPostParams) {
  return useInfiniteQuery({
    queryKey: [GET_POST_QUERY_KEY, params],
    queryFn: async ({ pageParam, signal }) => {
      const { data } = await api.get<PaginatedGetpostsApiResponse>("posts", {
        params: {
          page: pageParam,
          limit: params?.limit ?? 10,
        },
        signal,
      });

      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.hasMore) {
        return lastPage.pagination.nextPage;
      }

      return undefined;
    },
    initialPageParam: 1,
    select(data) {
      return data.pages.flatMap((p) => p.data);
    },
  });
}
