import { type UndefinedInitialDataOptions } from "@tanstack/react-query";
import { api } from "~/server/api";

export const GET_DRAFT_DETAIL_QUERY_KEY = "useGetDraftDetail";

async function fetchChangeRequestDetail(
  draftId: number,
  entityType: string,
): Promise<unknown> {
  const { data } = await api.get(
    `dashboard/change-requests/${entityType}/${draftId}`,
  );
  return data as unknown;
}

export const getChangeRequestDetailConfig = (
  draftId: number,
  entityType: string,
): UndefinedInitialDataOptions<unknown, unknown, unknown, unknown[]> => {
  return {
    initialData: undefined,
    queryKey: [GET_DRAFT_DETAIL_QUERY_KEY, draftId, entityType],
    queryFn: () => fetchChangeRequestDetail(draftId, entityType),
  };
};
