import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "~/server/api";

const GET_HIERARCHIES_KEY = "useGetHierarchies";

export interface GetHierarchiesApiResponse {
  id: number;
  name: string;
}

async function fetchHierarchies() {
  const { data } = await api.get<GetHierarchiesApiResponse[]>(
    "/dashboard/hierarchies",
  );

  return data;
}

export const getHierarchies = (): UndefinedInitialDataOptions<
  GetHierarchiesApiResponse[],
  Error,
  GetHierarchiesApiResponse[],
  string[]
> => {
  return {
    queryKey: [GET_HIERARCHIES_KEY],
    queryFn: fetchHierarchies,
  };
};

export function useGetHierarchies() {
  return useQuery(getHierarchies());
}
