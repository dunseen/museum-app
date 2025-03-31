import { type Nullable } from "~/types";
import { type GetCharacteristicApiResponse } from "./characteristic.types";
import { type GetHierarchyApiResponse } from "./hierarchy";

export interface GetTaxonApiResponse {
  id: number;
  name: string;
  hierarchy: GetHierarchyApiResponse;
}

type Parent = {
  id: number;
  name: string;
};
export type GetTaxonsApiResponse = {
  id: number;
  name: string;
  hierarchy: GetHierarchyApiResponse;
  parent: Nullable<Parent>;
  characteristics: GetCharacteristicApiResponse[];
};
