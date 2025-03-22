import { useMutation } from "@tanstack/react-query";
import { api } from "~/server/api";

type PostCharacteristicTypes = {
  name: string;
};

type PostCharacteristicTypesResponse = {
  id: number;
  name: string;
};

async function postCharacteristicTypes(payload: PostCharacteristicTypes) {
  const { data } = await api.post<PostCharacteristicTypesResponse>(
    "/dashboard/characteristic-types",
    payload,
  );

  return data;
}
export function usePostCharacteristicTypes() {
  return useMutation({
    mutationFn: postCharacteristicTypes,
  });
}
