import { type Nullable } from "~/types";
import { type FileTypeApiResponse } from "./file.types";
import { type GetCharacteristicApiResponse } from "./characteristic.types";
import { type GetTaxonApiResponse } from "./taxonomy.types";
import { type LocalTypeApiResponse } from "./local.types";

export interface GetSpecieApiResponse {
  id: number;

  scientificName: string;

  commonName: string;

  description: Nullable<string>;

  taxons: GetTaxonApiResponse[];

  location: LocalTypeApiResponse;

  collectedAt: Date;

  characteristics: GetCharacteristicApiResponse[];

  files: FileTypeApiResponse[];
}
