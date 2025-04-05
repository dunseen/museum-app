import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { GET_SPECIES_QUERY_KEY } from "./useGetSpecies";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { GET_LAST_POSTS_QUERY_KEY } from "~/app/dashboard/home/api";

async function postSpecies(payload: FormData) {
  const { data } = await api.post<GetSpecieApiResponse>(
    "/dashboard/species",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}
export function usePostSpecies() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSpecies,
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
