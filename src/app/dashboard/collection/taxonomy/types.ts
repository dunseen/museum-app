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
