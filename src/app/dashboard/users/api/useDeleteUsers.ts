import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/server/api';
import { GET_USERS_QUERY_KEY } from './useGetUsers';

export type DeleteUsersPayload = {
  id: string;
};

async function deleteUsers(payload: DeleteUsersPayload) {
  const { data } = await api.delete<void>(`/dashboard/users/${payload.id}`);

  return data;
}
export function useDeleteUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUsers,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_USERS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
