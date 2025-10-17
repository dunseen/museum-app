import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "~/server/api";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";

export const GET_SPECIE_DRAFT_DETAIL_KEY = "useGetSpecieDraftDetail";

async function fetchSpecieDraftDetail(id: number) {
  const { data } = await api.get<GetSpecieApiResponse>(
    `/dashboard/change-requests/species/drafts/${id}`,
  );
  return data;
}

export const getSpecieDraftDetailConfig = (
  id?: number,
): UndefinedInitialDataOptions<
  GetSpecieApiResponse,
  unknown,
  GetSpecieApiResponse,
  (string | number)[]
> => {
  return {
    queryKey: [GET_SPECIE_DRAFT_DETAIL_KEY, id ?? ""],
    queryFn: () => fetchSpecieDraftDetail(Number(id)),
    enabled: !!id,
  };
};

export function useGetSpecieDraftDetail(id?: number) {
  return useQuery(getSpecieDraftDetailConfig(id));
}
