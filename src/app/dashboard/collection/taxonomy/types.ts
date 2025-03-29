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


