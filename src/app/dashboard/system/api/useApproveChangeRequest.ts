import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/server/api';
import { GET_CHANGE_REQUESTS_QUERY_KEY } from './useGetChangeRequests';

async function approveChangeRequest(id: number) {
  return api.patch(`/dashboard/change-requests/${id}/approve`);
}

export function useApproveChangeRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveChangeRequest,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_CHANGE_REQUESTS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
