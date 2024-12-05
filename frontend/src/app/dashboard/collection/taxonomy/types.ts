export type Taxonomy = {
  id: string;
  name: string;
  hierarchy: string;
  parent?: {
    id: string;
    name: string;
  };
  characteristics?: { id: string; name: string }[];
};
