"use client";

import { DataTable } from "../../../shared/components/data-table";
import { useTaxonomyTable } from "../use-taxonomy-table";
import { Input } from "~/components/ui/input";
import { useState } from "react";
import { ConfirmationAlert } from "../../../shared/components/confirmation-alert";
import { AddTaxonomy } from "../add/add-taxonomy";
import { useGetTaxons } from "../api";
import { TablePagination } from "~/app/dashboard/shared/components/table-pagination";
import { useDebouncedInput } from "~/hooks/use-debounced-input";

export default function Taxons() {
  const [curentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(10);

  const {
    columns,
    selectedTaxonomyId,
    selectedTaxonomy,
    resetSelectedTaxonomy,
    resetSelectedTaxonomyId,
  } = useTaxonomyTable();

  const { debouncedInput, inputValue, onInputChange } = useDebouncedInput();

  const { data } = useGetTaxons({
    limit: pageLimit,
    page: curentPage,
    name: debouncedInput,
  });

  return (
    <>
      <header className="mb-4 flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <div className="flex min-w-72">
            <Input
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={"Buscar por nome"}
            />
          </div>
          <AddTaxonomy
            data={selectedTaxonomy}
            resetSelectedTaxonomy={resetSelectedTaxonomy}
          />
        </div>
        <TablePagination
          currentPage={curentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={data?.pagination?.total ?? 0}
          pageLimit={pageLimit}
          hasMore={data?.pagination?.hasMore}
        />
      </header>

      <DataTable columns={columns} data={data?.data ?? []} />

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
