"use client";

import { Button } from "~/components/ui/button";
import { HeaderFiltersAndPagination } from "../../shared/components/header-filters-and-pagination";
import { useHeaderFilters } from "../../shared/hooks/use-header-filters";
import { PlusIcon } from "lucide-react";
import { useDisclosure } from "~/hooks/use-disclosure";
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
import { useRouter } from "next/navigation";

export default function Page() {
  const {
    columns,
    selectedCharacteristicId,
    selectedCharacteristicImages,
    resetSelectedCharacteristicImages,
    resetSelectedCharacteristicId,
  } = useCharacteristicTable();

  const { handleTaxonomyChange, onSearchChange, searchValue, taxonomyFilters } =
    useHeaderFilters();

  const router = useRouter();

  return (
    <>
      <header className="mb-4 flex justify-between">
        <HeaderFiltersAndPagination
          handleTaxonomyChange={handleTaxonomyChange}
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          taxonomyFilters={taxonomyFilters}
          searchPlaceholder="Busca por nome"
        />
        <Button
          onClick={() =>
            router.push("/dashboard/collection/characteristics/add")
          }
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
