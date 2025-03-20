import { useMutation } from "@tanstack/react-query";
import { api } from "~/server/api";

type PostCharacteristics = {
  name: string;
  typeId: number;
  description: string;
};

function postCharacteristics(data: PostCharacteristics) {
  return api.post("/dashboard/characteristics", data);
}
export function usePostCharacteristics() {
  return useMutation({
    mutationFn: postCharacteristics,
  });
}
