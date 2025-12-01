import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/server/api';
import { GET_CHANGE_REQUESTS_QUERY_KEY } from './useGetChangeRequests';

type RejectPayload = {
  id: number;
  reviewerNote?: string;
};

async function rejectChangeRequest(payload: RejectPayload) {
  return api.patch(`/dashboard/change-requests/${payload.id}/reject`, {
    reviewerNote: payload.reviewerNote ?? undefined,
  });
}

export function useRejectChangeRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rejectChangeRequest,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_CHANGE_REQUESTS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
