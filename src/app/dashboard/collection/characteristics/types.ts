export type Characteristic = {
  id: string;
  name: string;
  description: string;
  type: string;
  images: string[];
};

export enum OperationStatus {
  COMPLETED = 'completed',
  PENDING_APPROVAL = 'pending_approval',
}

export interface CharacteristicOperationResult {
  status: OperationStatus;
  message: string;
  changeRequestId: number | null;
  affectedSpeciesCount?: number;
}
