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
  const [searchValue, setSearchValue] = useState("");
  const [searchDebounced, setSearchDebounced] = useState("");

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

  const { data, isLoading } = useGetCharacteristics({ name: searchDebounced });

  useDebounce(
    () => {
      setSearchDebounced(searchValue);
    },
    500,
    [searchValue],
  );

  return (
    <>
      <header className="mb-4 flex justify-between">
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
      </header>

      <DataTable columns={columns} data={data ?? []} isLoading={isLoading} />

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
