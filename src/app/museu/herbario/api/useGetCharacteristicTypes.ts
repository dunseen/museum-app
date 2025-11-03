import { useQuery } from "@tanstack/react-query";
import { publicApi } from "~/server/api";
import { type PaginationParams, type WithPagination } from "~/types/pagination";

export type GetCharacteristicTypesApiResponse = {
  id: number;
  name: string;
};
export type PaginatedGetCharacteristicTypesApiResponse =
  WithPagination<GetCharacteristicTypesApiResponse>;

export type CharacteristicTypeParams = PaginationParams & {
  name?: string;
};

export const GET_CHARACTERISTIC_TYPES_KEY = "characteristic-types";

async function fetchCharacteristicTypes(
  params?: CharacteristicTypeParams,
  signal?: AbortSignal,
) {
  const { data } =
    await publicApi.get<PaginatedGetCharacteristicTypesApiResponse>(
      "/characteristic-types",
      {
        params: {
          ...(params?.name ? { name: params.name } : {}),
          page: params?.page ?? 1,
          limit: params?.limit ?? 100,
        },
        signal,
      },
    );

  return data;
}

export function useGetCharacteristicTypes(params?: CharacteristicTypeParams) {
  return useQuery({
    queryKey: [GET_CHARACTERISTIC_TYPES_KEY, params],
    queryFn: ({ signal }) => fetchCharacteristicTypes(params, signal),
  });
}
