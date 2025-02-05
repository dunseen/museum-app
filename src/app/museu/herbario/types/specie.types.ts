import { type Nullable } from "~/types";
import { type FileTypeApiResponse } from "./file.types";
import { type GetCharacteristicApiResponse } from "./characteristic.types";
import { type GetTaxonApiResponse } from "./taxonomy.types";

export interface GetSpecieApiResponse {
  id: number;

  scientificName: string;

  commonName: string;

  description: Nullable<string>;

  taxonomy: GetTaxonApiResponse;

  characteristics: GetCharacteristicApiResponse[];

  files: FileTypeApiResponse[];
}
