export type Nullable<T> = T | null;

export enum RoleEnum {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  OPERATOR = 'OPERATOR',
}

export const EntityType = {
  SPECIE: 'specie',
  CHARACTERISTIC: 'characteristic',
  TAXON: 'taxon',
} as const;

export type EntityTypeValue = (typeof EntityType)[keyof typeof EntityType];
