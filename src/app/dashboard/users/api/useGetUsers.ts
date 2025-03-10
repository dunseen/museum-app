import {
  type UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { api } from "~/server/api";

export const GET_USERS_KEY = "useGetUsers";

export interface GetUsersApiResponse {
    data: [
    {
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      phone: number,
      role: {
        id: number,
        name: string
      },
      status: {
        id: number,
        name: string
      },
      createdAt: Date,
      updatedAt: Date,
      deletedAt: Date
    }
  ],
  hasNextPage: boolean
  }

export async function fetchUsers() {
  const { data } = await api.get<GetUsersApiResponse>(
    "/users",
  );
  return data;
}

export const getUsers = (): UndefinedInitialDataOptions<
  GetUsersApiResponse,
  Error,
  GetUsersApiResponse,
  string[]
> => {
  return {
    queryKey: [GET_USERS_KEY],
    queryFn: fetchUsers,
  };
};

export function useGetUsers() {
  return useQuery(getUsers());
}
