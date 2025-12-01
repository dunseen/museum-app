import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '~/server/api';
import { GET_TAXONS_QUERY_KEY } from './useGetTaxons';
import { type TaxonOperationResult } from '../types';

export type PutTaxonsPayload = {
  id: number;
  name: string;
  hierarchyId: number;
  parentId?: number | null;
  characteristicIds: number[];
};

async function putTaxons(payload: PutTaxonsPayload) {
  const { id, ...rest } = payload;
  const { data } = await api.put<TaxonOperationResult>(
    `/dashboard/change-requests/taxons/${id}`,
    rest,
  );

  return data;
}
export function usePutTaxons() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putTaxons,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_TAXONS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
