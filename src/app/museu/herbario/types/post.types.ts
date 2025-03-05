import { type Nullable } from "~/types";
import { type GetSpecieApiResponse } from "./specie.types";

type SimpleUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type PostStatusFilter = "pending" | "approved" | "rejected" | "all";

export interface GetPostDetailsApiResponse {
  id: string;

  status: string;

  rejectReason: Nullable<string>;

  author: SimpleUser;
  specie: GetSpecieApiResponse;

  validator: Nullable<SimpleUser>;

  createdAt: Date;

  updatedAt: string;
}
