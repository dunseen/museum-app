import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/server/api';
import { GET_CHARACTERISTICS_QUERY_KEY } from './useGetCharacteristics';
import { type CharacteristicOperationResult } from '../types';

export type DeleteCharacteristicPayload = {
  id: number;
};

async function deleteCharacteristic(payload: DeleteCharacteristicPayload) {
  const { data } = await api.delete<CharacteristicOperationResult>(
    `/dashboard/change-requests/characteristics/${payload.id}`,
  );

  return data;
}
export function useDeleteCharacteristic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCharacteristic,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_CHARACTERISTICS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
