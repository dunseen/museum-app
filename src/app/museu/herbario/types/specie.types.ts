import { type Nullable } from '~/types';
import { type FileTypeApiResponse } from './file.types';
import { type GetCharacteristicApiResponse } from './characteristic.types';
import { type GetTaxonApiResponse } from './taxonomy.types';
import { type LocalTypeApiResponse } from './local.types';
import { type SpecialistApiResponse } from './specialist.types';

export type SpecieStatus = 'pending' | 'approved' | 'rejected' | 'withdrawn';

export interface GetSpecieApiResponse {
  id: number;

  scientificName: string;

  commonName: string;

  description: Nullable<string>;

  taxons: GetTaxonApiResponse[];

  location: LocalTypeApiResponse;

  collector: SpecialistApiResponse;
  determinator: SpecialistApiResponse;

  collectedAt: string;
  determinatedAt: string;

  characteristics: GetCharacteristicApiResponse[];

  files: FileTypeApiResponse[];

  status: SpecieStatus;

  statusReason: string | null;

  diff?: Record<string, unknown> | null;
}
