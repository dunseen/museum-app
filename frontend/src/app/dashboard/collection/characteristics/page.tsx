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
            name: "Simples",
            type: "Folha",
            description: "Possui um único limbo ligado diretamente ao pecíolo.",
            images: [
              "https://images.unsplash.com/photo-1629917605324-6b4a9a4e7d5c",
            ],
          },
          {
            id: "2",
            name: "Composta Pinada",
            type: "Folha",
            description:
              "É formada por vários folíolos dispostos ao longo de um eixo central (raque).",
            images: [
              "https://images.unsplash.com/photo-1629917605324-6b4a9a4e7d5c",
            ],
          },
          {
            id: "3",
            name: "Composta Bipinada",
            type: "Folha",
            description:
              "Os folíolos são divididos em subfolíolos, formando um arranjo ainda mais ramificado.",
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
