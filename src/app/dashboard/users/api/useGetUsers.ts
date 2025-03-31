import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { type GetUserApiResponse } from "~/app/museu/herbario/types/users.types";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";

export type PaginatedGetUsersApiResponse = WithPagination<GetUserApiResponse>;

export type GetUsersParams = PaginationParams & {
  name?: string;
};

export const GET_USERS_QUERY_KEY = "useGetUsers";

async function fetchUsers(params?: GetUsersParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      filters: {
        name: params?.name ? params.name : undefined,
        email: params?.name ? params.name : undefined,
      },
    },
  };

  const { data } = await api.get<PaginatedGetUsersApiResponse>(
    "dashboard/users",
    requestConfig,
  );

  return data;
}
export const getUsersConfig = (
  params?: GetUsersParams,
): UndefinedInitialDataOptions<
  PaginatedGetUsersApiResponse,
  Error,
  PaginatedGetUsersApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_USERS_QUERY_KEY, params as unknown as string],
    queryFn: () => fetchUsers(params),
    staleTime: 1000 * 60 * 5,
  };
};

export function useGetUsers(params?: GetUsersParams) {
  return useQuery(getUsersConfig(params));
}
