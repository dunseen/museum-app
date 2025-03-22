import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { GET_CHARACTERISTICS_QUERY_KEY } from "./useGetCharacteristics";

type PostCharacteristicsApiResponse = {
  id: number;
  name: string;
  description: string;
  type: string;
};

function postCharacteristics(data: FormData) {
  return api.post<PostCharacteristicsApiResponse>(
    "/dashboard/characteristics",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
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
