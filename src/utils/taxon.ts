import { type GetHierarchyApiResponse } from "~/app/museu/herbario/types/hierarchy";

export const getTaxonOfHierarchy = (
  name: string,
  hierarchies: GetHierarchyApiResponse[],
) => {
  const taxon = hierarchies.find((h) => h?.name?.toLowerCase() === name);

  if (taxon) {
    return taxon.name;
  }

  return null;
};
