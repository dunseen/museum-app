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
import { useGetCharacteristics } from "../api";
import { useDebounce } from "react-use";
import { TablePagination } from "~/app/dashboard/shared/components/table-pagination";

export default function Characteristics() {
  const [searchValue, setSearchValue] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");

  const [curentPage, setCurrentPage] = useState(1);
  const [pageLimit] = useState(15);

  const onSearchChange = (value: string) => setSearchValue(value);

  const {
    columns,
    selectedCharacteristicId,
    selectedCharacteristicImages,
    selectedCharacteristic,
    resetSelectedCharacteristic,
    resetSelectedCharacteristicImages,
    resetSelectedCharacteristicId,
  } = useCharacteristicTable();

  const { data, isLoading, isFetching } = useGetCharacteristics({
    name: searchDebounced,
    page: curentPage,
    limit: pageLimit,
  });

  useDebounce(
    () => {
      setSearchDebounced(searchValue);
    },
    500,
    [searchValue],
  );

  return (
    <>
      <header className="mb-4 flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <div className="flex min-w-72">
            <Input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
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
          onConfirm={resetSelectedCharacteristicId}
        />
      ) : null}
    </>
  );
}
