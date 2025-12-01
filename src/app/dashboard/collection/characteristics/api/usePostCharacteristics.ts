import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/server/api';
import { GET_CHARACTERISTICS_QUERY_KEY } from './useGetCharacteristics';

type PostCharacteristicsApiResponse = {
  id: number;
  name: string;
  description: string;
  type: string;
};

async function postCharacteristics(payload: FormData) {
  const { data } = await api.post<PostCharacteristicsApiResponse>(
    '/dashboard/characteristics',
    payload,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
}
export function usePostCharacteristics() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postCharacteristics,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_CHARACTERISTICS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
