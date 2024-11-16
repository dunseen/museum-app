"use client";

import { Button } from "~/components/ui/button";
import { DataTable } from "../../shared/components/data-table";
import { useTaxonomyTable } from "./use-taxonomy-table";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { ConfirmationAlert } from "../../shared/components/confirmation-alert";

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
  const { columns, selectedTaxonomyId, resetSelectedTaxonomyId } =
    useTaxonomyTable();

  const router = useRouter();

  return (
    <>
      <header className="mb-4 flex justify-between">
        <div className="flex min-w-72">
          <Search />
        </div>
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
