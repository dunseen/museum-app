import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "~/server/api";
import { type GetPostDetailsApiResponse } from "../types/post.types";
import { formatDate } from "~/utils/date";

const GET_POST_DETAILS_KEY = "useGetPostDetails";

async function fetchPostDetails(name: string) {
  const { data } = await api.get<GetPostDetailsApiResponse>(
    `/posts/species/${encodeURIComponent(name)}`,
  );

  return data;
}

export const getPostDetailsQueryConfig = (
  name: string,
): UndefinedInitialDataOptions<
  GetPostDetailsApiResponse,
  Error,
  GetPostDetailsApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_POST_DETAILS_KEY, name],
    queryFn: () => fetchPostDetails(name),
    enabled: !!name,
    select(data) {
      return {
        ...data,
        updatedAt: formatDate(data.updatedAt),
      };
    },
  };
};

export function useGetPostDetails(name: string) {
  return useQuery(getPostDetailsQueryConfig(name));
}
