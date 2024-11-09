"use client";

import { Button } from "~/components/ui/button";
import { DataTable } from "../../shared/components/data-table";
import { useTaxonomyTable } from "./use-taxonomy-table";
import { PlusIcon } from "lucide-react";
import { HeaderFiltersAndPagination } from "../../shared/components/header-filters-and-pagination";
import { useHeaderFilters } from "../../shared/hooks/use-header-filters";
import { useRouter } from "next/navigation";

export default function Page() {
  const { columns } = useTaxonomyTable();
  const { handleTaxonomyChange, onSearchChange, searchValue, taxonomyFilters } =
    useHeaderFilters();

  const router = useRouter();

  return (
    <>
      <header className="mb-4 flex justify-between">
        <HeaderFiltersAndPagination
          handleTaxonomyChange={handleTaxonomyChange}
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          taxonomyFilters={taxonomyFilters}
          searchPlaceholder="Busca por nome"
        />
        <Button
          onClick={() => router.push("/dashboard/collection/taxonomy/add")}
        >
          <PlusIcon />
          Adicionar
        </Button>
      </header>

      <DataTable
        columns={columns}
        data={[
          {
            id: "1",
            name: "Plantae",
            hierarchy: "Reino",
          },
        ]}
      />
    </>
  );
}
