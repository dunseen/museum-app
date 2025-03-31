import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { GET_CHARACTERISTICS_QUERY_KEY } from "./useGetCharacteristics";

type PutCharacteristicsApiResponse = {
  id: number;
  name: string;
  description: string;
  type: string;
};

type PutCharacteristicsApiPayload = {
  id: number;
  formData: FormData;
};

async function putCharacteristics({
  formData,
  id,
}: PutCharacteristicsApiPayload) {
  const { data } = await api.put<PutCharacteristicsApiResponse>(
    `dashboard/characteristics/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
}
export function usePutCharacteristics() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putCharacteristics,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_CHARACTERISTICS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
