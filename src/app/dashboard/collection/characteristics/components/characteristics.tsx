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

const Search = () => {
  const [searchValue, setSearchValue] = useState("");

  const onSearchChange = (value: string) => setSearchValue(value);

  return (
    <div className="flex min-w-72">
      <Input
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={"Busca por nome, tipo ou descrição"}
      />
    </div>
  );
};

export default function Characteristics() {
  const {
    columns,
    selectedCharacteristicId,
    selectedCharacteristicImages,
    selectedCharacteristic,
    resetSelectedCharacteristic,
    resetSelectedCharacteristicImages,
    resetSelectedCharacteristicId,
  } = useCharacteristicTable();

  const { data } = useGetCharacteristics();

  return (
    <>
      <header className="mb-4 flex justify-between">
        <Search />
        <AddCharacteristic
          resetSelectedCharacteristic={resetSelectedCharacteristic}
          data={selectedCharacteristic}
        />
      </header>

      <DataTable columns={columns} data={data ?? []} />

      {!!selectedCharacteristicImages ? (
        <Dialog
          open={!!selectedCharacteristicImages}
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
