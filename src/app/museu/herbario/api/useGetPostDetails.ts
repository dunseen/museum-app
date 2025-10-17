import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { publicApi } from "~/server/api";
import { type GetPostDetailsApiResponse } from "../types/post.types";

const GET_POST_DETAILS_KEY = "useGetPostDetails";

async function fetchPostDetails(name: string) {
  const { data } = await publicApi.get<GetPostDetailsApiResponse>(
    `/posts/species/${encodeURIComponent(name)}`,
  );

  return data;
}

export const getPostDetailsQueryConfig = (
  name?: string,
): UndefinedInitialDataOptions<
  GetPostDetailsApiResponse,
  Error,
  GetPostDetailsApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_POST_DETAILS_KEY, String(name)],
    queryFn: () => fetchPostDetails(String(name)),
    enabled: !!name,
  };
};

export function useGetPostDetails(name?: string) {
  return useQuery(getPostDetailsQueryConfig(name));
}
