import { type Nullable } from "~/types";
import { type GetCharacteristicApiResponse } from "./characteristic.types";
import { type GetHierarchyApiResponse } from "./hierarchy";

export interface GetTaxonApiResponse {
  kingdom: string;
  division: string;
  class: string;
  order: string;
  family: string;
  genus: string;
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
