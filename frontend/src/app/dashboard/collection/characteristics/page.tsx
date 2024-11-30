"use client";

import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useCharacteristicTable } from "./use-characteristic-table";
import { DataTable } from "../../shared/components/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { ImageCarousel } from "../../shared/components/image-carousel";
import { ConfirmationAlert } from "../../shared/components/confirmation-alert";
import { useState } from "react";
import { Input } from "~/components/ui/input";
import Link from "next/link";

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

export default function Page() {
  const {
    columns,
    selectedCharacteristicId,
    selectedCharacteristicImages,
    resetSelectedCharacteristicImages,
    resetSelectedCharacteristicId,
  } = useCharacteristicTable();

  return (
    <>
      <header className="mb-4 flex justify-between">
        <Search />
        <Link href="/dashboard/collection/characteristics/add" prefetch={true}>
          <Button>
            <PlusIcon />
            Adicionar
          </Button>
        </Link>
      </header>

      <DataTable
        columns={columns}
        data={[
          {
            id: "1",
            name: "Cor",
            type: "String",
            description: "Cor do animal",
            images: [
              "https://images.unsplash.com/photo-1629917605324-6b4a9a4e7d5c",
            ],
          },
          {
            id: "2",
            name: "Tamanho",
            type: "Number",
            description: "Tamanho do animal",
            images: [
              "https://images.unsplash.com/photo-1629917605324-6b4a9a4e7d5c",
            ],
          },
          {
            id: "3",
            name: "Peso",
            type: "Number",
            description: "Peso do animal",
            images: [
              "https://images.unsplash.com/photo-1629917605324-6b4a9a4e7d5c",
            ],
          },
        ]}
      />

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
