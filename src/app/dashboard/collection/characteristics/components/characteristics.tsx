"use client";

import { useCharacteristicTable } from "../use-characteristic-table";
import { DataTable } from "../../../shared/components/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ImageCarousel } from "../../../shared/components/image-carousel";
import { ConfirmationAlert } from "../../../shared/components/confirmation-alert";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import { AddCharacteristic } from "../add/add-characteristic";
import { useDeleteCharacteristic, useGetCharacteristics } from "../api";
import { TablePagination } from "~/app/dashboard/shared/components/table-pagination";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import { toast } from "sonner";
import { OperationStatus } from "../types";

export default function Characteristics() {
  const [curentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(15);

  const {
    columns,
    selectedCharacteristicId,
    selectedCharacteristicImages,
    selectedCharacteristic,
    resetSelectedCharacteristic,
    resetSelectedCharacteristicImages,
    resetSelectedCharacteristicId,
  } = useCharacteristicTable();

  const deleteCharacteristic = useDeleteCharacteristic();

  const handleDeleteCharacteristic = () => {
    if (!selectedCharacteristicId) return;

    deleteCharacteristic.mutate(
      { id: selectedCharacteristicId },
      {
        onSuccess(data) {
          if (data.status === OperationStatus.COMPLETED) {
            toast.success("Característica deletada com sucesso");
          } else {
            const count = data.affectedSpeciesCount ?? 0;
            const speciesText = count === 1 ? "espécie" : "espécies";
            toast.info(
              `Solicitação enviada para aprovação. Esta característica está sendo usada por ${count} ${speciesText}.`,
            );
          }
          resetSelectedCharacteristicId();
        },
        onError() {
          toast.error("Erro ao processar solicitação de exclusão");
        },
      },
    );
  };

  const { debouncedInput, inputValue, onInputChange } = useDebouncedInput();

  const { data, isLoading, isFetching } = useGetCharacteristics({
    name: debouncedInput,
    page: curentPage,
    limit: pageLimit,
  });

  return (
    <>
      <header className="mb-4 flex flex-col gap-4">
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex min-w-72">
            <Input
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              placeholder={"Busca por nome, tipo ou descrição"}
            />
          </div>
          <AddCharacteristic
            resetSelectedCharacteristic={resetSelectedCharacteristic}
            data={selectedCharacteristic}
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

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        isLoading={isLoading || isFetching}
      />

      {!!selectedCharacteristicImages ? (
        <Dialog
          open={!!selectedCharacteristicImages?.images?.length}
          onOpenChange={resetSelectedCharacteristicImages}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedCharacteristicImages.name}</DialogTitle>
              <ImageCarousel images={selectedCharacteristicImages.images} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}

      {!!selectedCharacteristicId ? (
        <ConfirmationAlert
          isOpen={!!selectedCharacteristicId}
          onClose={resetSelectedCharacteristicId}
          onCancel={resetSelectedCharacteristicId}
          onConfirm={handleDeleteCharacteristic}
          isLoading={deleteCharacteristic.isPending}
        />
      ) : null}
    </>
  );
}
