import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { GET_TAXONS_QUERY_KEY } from "./useGetTaxons";

type PostTaxonsApiResponse = {
  id: number;
  name: string;
  description: string;
  type: string;
};

export type PostTaxonsPayload = {
  name: string;
  hierarchyId: number;
  parentId?: number | null;
  characteristicIds: number[];
};

async function postTaxons(payload: PostTaxonsPayload) {
  const { data } = await api.post<PostTaxonsApiResponse>(
    "/dashboard/taxons",
    payload,
  );

  return data;
}
export function usePostTaxons() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postTaxons,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_TAXONS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
