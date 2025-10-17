import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { GET_SPECIES_QUERY_KEY } from "./useGetSpecies";

export type DeleteSpeciePayload = {
  id: number;
};

async function deleteSpecie(payload: DeleteSpeciePayload) {
  const { data } = await api.delete<void>(
    `/dashboard/change-requests/species/${payload.id}`,
  );

  return data;
}
export function useDeleteSpecie() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSpecie,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_SPECIES_QUERY_KEY],
        exact: false,
      });
    },
  });
}
