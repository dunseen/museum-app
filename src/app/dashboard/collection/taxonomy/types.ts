export type Taxonomy = {
  id: number;
  name: string;
  hierarchy: {
    id: number;
    name: string;
  };
  parent?: {
    id: number;
    name: string;
  };
  characteristics?: { id: string; name: string }[];
};

export type GetCitiesApiResponse = {
  id: number;
  name: string;
  state: {
    id: number;
    name: string;
    code: string;
  };
};

export type GetStatesApiResponse = {
  id: number;
  name: string;
  state: {
    id: number;
    name: string;
    code: string;
  };
};

export enum TaxonOperationStatus {
  COMPLETED = "completed",
  PENDING_APPROVAL = "pending_approval",
}

export interface TaxonOperationResult {
  status: TaxonOperationStatus;
  message: string;
  changeRequestId: number | null;
  affectedSpeciesCount?: number;
}

