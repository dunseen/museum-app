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
  proposedAt: string;
  decidedAt?: string | null;
};

export type DraftWithChangeRequest = {
  id: number;
  entityType: string;
  entityName: string;
  createdAt: string;
  changeRequest: SimpleChangeRequest;
};

export type PaginatedDraftsApiResponse = WithPagination<DraftWithChangeRequest>;

export type GetDraftsParams = PaginationParams & {
  status?: ChangeRequestStatus;
  action?: ChangeRequestAction;
  entityType?: string;
  search?: string;
};

export const GET_CHANGE_REQUESTS_QUERY_KEY = "useGetChangeRequests";

async function fetchChangeRequests(params?: GetDraftsParams) {
  const requestConfig: AxiosRequestConfig = {
    params: {
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
      status: params?.status,
      action: params?.action,
      entityType: params?.entityType,
      search: params?.search,
    },
  };

  const { data } = await api.get<PaginatedDraftsApiResponse>(
    "dashboard/change-requests",
    requestConfig,
  );

  return data;
}

export const getChangeRequestsConfig = (
  params?: GetDraftsParams,
): UndefinedInitialDataOptions<
  PaginatedDraftsApiResponse,
  unknown,
  PaginatedDraftsApiResponse,
  unknown[]
> => {
  return {
    initialData: undefined,
    queryKey: [GET_CHANGE_REQUESTS_QUERY_KEY, params],
    queryFn: () => fetchChangeRequests(params),
  };
};

export function useGetChangeRequests(params?: GetDraftsParams) {
  return useQuery(getChangeRequestsConfig(params));
}
