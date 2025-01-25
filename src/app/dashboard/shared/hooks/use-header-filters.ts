import { useState } from "react";
import { type TaxonomyFilters } from "../../collection/species/types";
import { type Nullable } from "~/types";

export function useHeaderFilters() {
  const [searchValue, setSearchValue] = useState("");

  const [taxonomyFilters, setTaxonomyFilters] = useState<TaxonomyFilters>({
    division: null,
    class: null,
    order: null,
    family: null,
    genus: null,
  });

  const onSearchChange = (searchValue: string) => setSearchValue(searchValue);

  const handleTaxonomyChange = (level: string, value: Nullable<string>) => {
    setTaxonomyFilters((prev) => ({
      ...prev,
      [level]: value,
    }));
  };

  return {
    searchValue,
    taxonomyFilters,
    onSearchChange,
    handleTaxonomyChange,
  };
}
