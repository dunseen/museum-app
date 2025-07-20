import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { GET_USERS_QUERY_KEY } from "./useGetUsers";
import { type GetUserApiResponse } from "~/app/museu/herbario/types/users.types";

export type PostUsersPayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: {
    id: number;
  };
};

async function postUsers(payload: PostUsersPayload) {
  const { data } = await api.post<GetUserApiResponse>(
    "/dashboard/users",
    payload,
  );

  return data;
}
export function usePostUsers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUsers,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_USERS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
