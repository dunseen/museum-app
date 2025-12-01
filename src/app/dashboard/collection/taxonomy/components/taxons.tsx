'use client';

import { DataTable } from '../../../shared/components/data-table';
import { useTaxonomyTable } from '../use-taxonomy-table';
import { Input } from '~/components/ui/input';
import { useState } from 'react';
import { ConfirmationAlert } from '../../../shared/components/confirmation-alert';
import { AddTaxonomy } from '../add/add-taxonomy';
import { useDeleteTaxons, useGetTaxons } from '../api';
import { TablePagination } from '~/app/dashboard/shared/components/table-pagination';
import { useDebouncedInput } from '~/hooks/use-debounced-input';
import { toast } from 'sonner';
import { TaxonOperationStatus } from '../types';

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

  const deleteTaxon = useDeleteTaxons();

  const handleDeleteTaxon = () => {
    if (!selectedTaxonomyId) return;

    deleteTaxon.mutate(
      { id: selectedTaxonomyId },
      {
        onSuccess(data) {
          if (data.status === TaxonOperationStatus.COMPLETED) {
            toast.success('Taxonomia deletada com sucesso');
          } else {
            const count = data.affectedSpeciesCount ?? 0;
            const speciesText = count === 1 ? 'espécie' : 'espécies';
            toast.info(
              `Solicitação enviada para aprovação. Esta taxonomia está sendo usada por ${count} ${speciesText}.`,
            );
          }
          resetSelectedTaxonomyId();
        },
        onError() {
          toast.error('Erro ao deletar taxonomia');
        },
      },
    );
  };

  const { debouncedInput, inputValue, onInputChange } = useDebouncedInput();

  const { data } = useGetTaxons({
    limit: pageLimit,
    page: curentPage,
    name: debouncedInput,
  });

  return (
    <>
      <header className="mb-4 flex flex-col gap-4">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex min-w-72">
            <Input
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={'Buscar por nome'}
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
          onConfirm={handleDeleteTaxon}
          isLoading={deleteTaxon.isPending}
        />
      ) : null}
    </>
  );
}
