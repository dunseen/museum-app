import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { GET_SPECIES_QUERY_KEY } from "./useGetSpecies";
import { GET_LAST_POSTS_QUERY_KEY } from "~/app/dashboard/home/api";

type PutSpecieApiPayload = {
  id: number;
  formData: FormData;
};

async function putSpecies({ formData, id }: PutSpecieApiPayload) {
  const { data } = await api.put<GetSpecieApiResponse>(
    `dashboard/species/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}
export function usePutSpecies() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putSpecies,
    async onSuccess() {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [GET_SPECIES_QUERY_KEY],
          exact: false,
        }),
        queryClient.invalidateQueries({
          queryKey: [GET_LAST_POSTS_QUERY_KEY],
          exact: false,
        }),
      ]);
    },
  });
}
