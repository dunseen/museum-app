import { type Nullable } from '~/types';

export type Specie = {
  id: string;
  scientificName: string;
  commonName: string;
  description: string;
  division: string;
  class: string;
  order: string;
  family: string;
  genus: string;
  status: string;
  images: string[];
};

export type TaxonomyFilters = {
  class: Nullable<string>;
  order: Nullable<string>;
  family: Nullable<string>;
  genus: Nullable<string>;
};
