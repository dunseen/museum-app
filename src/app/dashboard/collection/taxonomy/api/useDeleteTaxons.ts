import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { GET_TAXONS_QUERY_KEY } from "./useGetTaxons";

type PutTaxonsApiResponse = {
  id: number;
  name: string;
  description: string;
  type: string;
};

export type DeleteTaxonsPayload = {
  id: number;
};

async function deleteTaxons(payload: DeleteTaxonsPayload) {
  const { data } = await api.delete<PutTaxonsApiResponse>(
    `/dashboard/taxons/${payload.id}`,
  );

  return data;
}
export function useDeleteTaxons() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTaxons,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_TAXONS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
