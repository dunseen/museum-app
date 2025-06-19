import { useMutation } from "@tanstack/react-query";
import {
  type SpecialistType,
  type SpecialistApiResponse,
} from "~/app/museu/herbario/types/specialist.types";
import { api } from "~/server/api";

type PostSpecialistPayload = {
  name: string;
  type: SpecialistType;
};

async function postSpecialists(payload: PostSpecialistPayload) {
  const { data } = await api.post<SpecialistApiResponse>(
    "/dashboard/specialists",
    payload,
  );

  return data;
}
export function usePostSpecialists() {
  return useMutation({
    mutationFn: postSpecialists,
  });
}
