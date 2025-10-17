import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { type AxiosRequestConfig } from "axios";
import { api } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";

export type ChangeRequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "withdrawn";

export type ChangeRequestAction = "create" | "update" | "delete";

export type UserAuthor = {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
};

export type SimpleChangeRequest = {
  id: number;
  status: ChangeRequestStatus;
  action: ChangeRequestAction;
  proposedBy: UserAuthor;
  reviewedBy?: UserAuthor | null;
  reviewerNote?: string | null;
};

export type SpecieDraftWithChangeRequest = {
  id: number;
  scientificName: string;
  createdAt: string;
  changeRequest: SimpleChangeRequest;
};

export type PaginatedChangeRequestsApiResponse =
  WithPagination<SpecieDraftWithChangeRequest>;

export type GetChangeRequestsParams = PaginationParams & {
  status?: ChangeRequestStatus;
  search?: string;
};

export const GET_CHANGE_REQUESTS_QUERY_KEY = "useGetChangeRequests";

async function fetchChangeRequests(params?: GetChangeRequestsParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      status: params?.status,
      search: params?.search,
    },
  };

  const { data } = await api.get<PaginatedChangeRequestsApiResponse>(
    "dashboard/change-requests/species/drafts",
    requestConfig,
  );

  return data;
}

export const getChangeRequestsConfig = (
  params?: GetChangeRequestsParams,
): UndefinedInitialDataOptions<
  PaginatedChangeRequestsApiResponse,
  unknown,
  PaginatedChangeRequestsApiResponse,
  unknown[]
> => {
  return {
    initialData: undefined,
    // Include params to properly refetch on filter/pagination changes
    queryKey: [GET_CHANGE_REQUESTS_QUERY_KEY, params],
    queryFn: () => fetchChangeRequests(params),
  };
};

export function useGetChangeRequests(params?: GetChangeRequestsParams) {
  return useQuery(getChangeRequestsConfig(params));
}
