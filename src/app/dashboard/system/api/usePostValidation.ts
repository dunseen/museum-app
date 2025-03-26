import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "~/server/api";
import { GET_LAST_POSTS_QUERY_KEY } from "./useGetLastPosts";

type PostValidationPayload = {
  rejectReason?: string;
  id: string;
};

async function postValidation(payload: PostValidationPayload) {
  return api.patch(`/dashboard/posts/${payload.id}/validate`, {
    rejectReason: payload.rejectReason ?? undefined,
  });
}
export function usePostValidation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postValidation,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: [GET_LAST_POSTS_QUERY_KEY],
        exact: false,
      });
    },
  });
}
