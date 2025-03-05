import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "~/server/api";

export const GET_HOME_SUMMARY_KEY = "useGetHomeSummary";

export interface GetHomeSummaryApiResponse {
  characteristicCount: number;
  familyCount: number;
  genusCount: number;
  specieCount: number;
}

export async function fetchSummary() {
  const { data } = await api.get<GetHomeSummaryApiResponse>(
    "/dashboard/summary/counts",
  );

  return data;
}

export const getHomeSummary = (): UndefinedInitialDataOptions<
  GetHomeSummaryApiResponse,
  Error,
  GetHomeSummaryApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_HOME_SUMMARY_KEY],
    queryFn: fetchSummary,
  };
};

export function useGetHomeSummary() {
  return useQuery(getHomeSummary());
}
