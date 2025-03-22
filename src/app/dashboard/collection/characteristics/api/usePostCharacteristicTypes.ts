import { useMutation } from "@tanstack/react-query";
import { api } from "~/server/api";

type PostCharacteristicTypes = {
  name: string;
};

type PostCharacteristicTypesResponse = {
  id: number;
  name: string;
};

function postCharacteristicTypes(data: PostCharacteristicTypes) {
  return api.post<PostCharacteristicTypesResponse>(
    "/dashboard/characteristic-types",
    data,
  );
}
export function usePostCharacteristicTypes() {
  return useMutation({
    mutationFn: postCharacteristicTypes,
  });
}
