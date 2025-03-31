import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { GET_USERS_QUERY_KEY } from "./useGetUsers";
import { type GetUserApiResponse } from "~/app/museu/herbario/types/users.types";

export type PutTaxonsPayload = {
  id: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  phone?: string;
  role?: {
    id: number;
  };
};

async function putUsers(payload: PutTaxonsPayload) {
  const { id, ...rest } = payload;
  const { data } = await api.put<GetUserApiResponse>(
    `/dashboard/users/${id}`,
    rest,
  );

  return data;
}
export function usePutUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUsers,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_USERS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
