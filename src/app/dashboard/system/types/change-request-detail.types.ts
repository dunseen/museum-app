import type { FileTypeApiResponse } from '~/app/museu/herbario/types/file.types';
import type { GetTaxonsApiResponse } from '~/app/museu/herbario/types/taxonomy.types';

export type ChangeRequestDiffEntry = { from?: unknown; to?: unknown };

export type FileDiffItem = { id: string; url: string; path: string };

export type FilesDiff = {
  added?: FileDiffItem[];
  removed?: FileDiffItem[];
};

export type ChangeRequestDiff = Record<string, ChangeRequestDiffEntry> & {
  files?: FilesDiff;
};

export type PersonName = { firstName: string | null; lastName: string | null };

export interface GetCharacteristicDraftDetailApiResponse {
  id: number;
  name: string;
  type: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  files: FileTypeApiResponse[];
  diff?: ChangeRequestDiff | null;
}

export interface GetTaxonDraftDetailApiResponse extends Omit<
  GetTaxonsApiResponse,
  'parent'
> {
  parent: GetTaxonsApiResponse['parent'];
  diff?: ChangeRequestDiff | null;
}
