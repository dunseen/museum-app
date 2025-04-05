"use client";

import { ConfirmationAlert } from "~/app/dashboard/shared/components/confirmation-alert";
import { DataTable } from "~/app/dashboard/shared/components/data-table";
import { ImageCarousel } from "~/app/dashboard/shared/components/image-carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { AddSpecie } from "../add/add-specie";
import { useSpecieTable } from "../use-specie-table";
import { useDeleteSpecie, useGetSpecies } from "../api";
import { TablePagination } from "~/app/dashboard/shared/components/table-pagination";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import { toast } from "sonner";

export default function Species() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(15);

  const {
    columns,
    selectedSpecieId,
    selectedSpecieImages,
    resetSelectedSpecieImages,
    resetSelectedSpecieId,
    resetSelectedSpecie,
    selectedSpecie,
  } = useSpecieTable();

  const deleteSpecie = useDeleteSpecie();

  const handleDeleteSpecie = () => {
    if (!selectedSpecieId) return;

    deleteSpecie.mutate(
      { id: selectedSpecieId },
      {
        onSuccess() {
          toast.success("Espécie deletada com sucesso");
          resetSelectedSpecieId();
        },
        onError() {
          toast.error("Erro ao deletar espécie");
        },
      },
    );
  };

  const { debouncedInput, inputValue, onInputChange } = useDebouncedInput();

  const { data } = useGetSpecies({
    limit,
    page: currentPage,
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
              placeholder={"Busca por nome científico ou popular"}
            />
          </div>
          <AddSpecie
            resetSelectedSpecie={resetSelectedSpecie}
            data={selectedSpecie}
          />
        </div>

        <TablePagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={data?.pagination?.total ?? 0}
        />
      </header>
      <DataTable columns={columns} data={data?.data ?? []} />

      {!!selectedSpecieImages ? (
        <Dialog
          open={!!selectedSpecieImages}
          onOpenChange={resetSelectedSpecieImages}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedSpecieImages.commonName}</DialogTitle>
              <ImageCarousel images={selectedSpecieImages.images} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}

      {!!selectedSpecieId ? (
        <ConfirmationAlert
          isOpen={!!selectedSpecieId}
          onClose={resetSelectedSpecieId}
          onCancel={resetSelectedSpecieId}
          onConfirm={handleDeleteSpecie}
          isLoading={deleteSpecie.isPending}
        />
      ) : null}
    </>
  );
}
