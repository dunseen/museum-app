"use client";

import { DataTable } from "../../shared/components/data-table";
import { useTaxonomyTable } from "./use-taxonomy-table";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { ConfirmationAlert } from "../../shared/components/confirmation-alert";
import { AddTaxonomy } from "./add/add-taxonomy";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (value: string) => setSearchValue(value);

  return (
    <Input
      value={searchValue}
      onChange={(e) => onSearchChange(e.target.value)}
      placeholder={"Busca por nome"}
    />
  );
};
export default function Page() {
  const {
    columns,
    selectedTaxonomyId,
    selectedTaxonomy,
    resetSelectedTaxonomy,
    resetSelectedTaxonomyId,
  } = useTaxonomyTable();

  return (
    <>
      <header className="mb-4 flex justify-between">
        <div className="flex min-w-72">
          <Search />
        </div>
        <AddTaxonomy
          data={selectedTaxonomy}
          resetSelectedTaxonomy={resetSelectedTaxonomy}
        />
      </header>

      <DataTable
        columns={columns}
        data={[
          {
            id: "1",
            name: "Plantae",
            hierarchy: "Reino",
          },
          {
            id: "2",
            name: "Magnoliophyta",
            hierarchy: "Divisão",
            parent: { id: "1", name: "Plantae" },
          },
          {
            id: "3",
            name: "Magnoliopsida",
            hierarchy: "Classe",
            parent: { id: "2", name: "Magnoliophyta" },
          },
          {
            id: "4",
            name: "Asterales",
            hierarchy: "Ordem",
            parent: { id: "3", name: "Magnoliopsida" },
          },
          {
            id: "5",
            name: "Asteraceae",
            hierarchy: "Família",
            parent: { id: "4", name: "Asterales" },
          },
          {
            id: "6",
            name: "Vernonia",
            hierarchy: "Gênero",
            parent: { id: "5", name: "Asteraceae" },
          },
        ]}
      />

      {!!selectedTaxonomyId ? (
        <ConfirmationAlert
          isOpen={!!selectedTaxonomyId}
          onClose={resetSelectedTaxonomyId}
          onCancel={resetSelectedTaxonomyId}
          onConfirm={resetSelectedTaxonomyId}
        />
      ) : null}
    </>
  );
}
