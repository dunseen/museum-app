import { type FileTypeApiResponse } from "./file.types";

export interface GetCharacteristicApiResponse {
  id: number;

  name: string;

  description: string;

  type: string;

  files: FileTypeApiResponse[];

  createdAt: Date;

  updatedAt: Date;
}
