import { type FileTypeApiResponse } from "./file.types";

export interface GetCharacteristicApiResponse {
  id: number;

  name: string;
  type: GetCharacteristicTypesApiResponse;
  files: FileTypeApiResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GetCharacteristicTypesApiResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}
