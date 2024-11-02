"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { DataTable } from "./data-table";
import { useSpecieTable } from "./use-specie-table";
import { ImageCarousel } from "../../shared/components/image-carousel";
import { ConfirmationAlert } from "../../shared/components/confirmation-alert";
import { EditSpecieDialog } from "./edit/edit-specie-dialog";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useDisclosure } from "~/hooks/use-disclosure";
import { AddSpecieDialog } from "./add/add-specie-dialog";
import { TablePagination } from "../../shared/components/table-pagination";
import { HeaderFiltersAndPagination } from "../../shared/components/header-filters-and-pagination";
import { useState } from "react";
import { TaxonomyFilters } from "./types";
import { Nullable } from "~/types";
import { useHeaderFilters } from "../../shared/hooks/use-header-filters";

export default function Page() {
  const {
    columns,
    selectedSpecie,
    selectedSpecieId,
    selectedSpecieImages,
    resetSelectedSpecieImages,
    resetSelectedSpecieId,
    resetSelectedSpecie,
  } = useSpecieTable();

  const addSpecieDialog = useDisclosure();

  const { handleTaxonomyChange, onSearchChange, searchValue, taxonomyFilters } =
    useHeaderFilters();

  return (
    <div className="container mx-auto py-10">
      <header className="mb-4 flex justify-between">
        <HeaderFiltersAndPagination
          handleTaxonomyChange={handleTaxonomyChange}
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          taxonomyFilters={taxonomyFilters}
          searchPlaceholder="Busca por nome científico ou popular"
        />
        <Button onClick={addSpecieDialog.onOpen}>
          <PlusIcon />
          Adicionar
        </Button>
      </header>
      <DataTable
        columns={columns}
        data={[
          {
            id: "1",
            commonName: "Açaí",
            scientificName: "Euterpe oleracea",
            description:
              "Açaí é uma fruta roxa aaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa",
            status: "Publicado",
            images: [
              "https://fastly.picsum.photos/id/326/200/300.jpg?hmac=SKzjQ5ycCVyISiOfq2m-GqpQ5zWT_J202KPYG7z0uB4",
              "https://fastly.picsum.photos/id/326/200/300.jpg?hmac=SKzjQ5ycCVyISiOfq2m-GqpQ5zWT_J202KPYG7z0uB4",
            ],
          },
        ]}
      />

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

      {!!selectedSpecie ? (
        <EditSpecieDialog
          resetSelectedSpecie={resetSelectedSpecie}
          selectedSpecie={selectedSpecie}
        />
      ) : null}

      {addSpecieDialog.isOpen ? (
        <AddSpecieDialog
          onClose={addSpecieDialog.onClose}
          isOpen={addSpecieDialog.isOpen}
        />
      ) : null}

      {!!selectedSpecieId ? (
        <ConfirmationAlert
          isOpen={!!selectedSpecieId}
          onClose={resetSelectedSpecieId}
          onCancel={resetSelectedSpecieId}
          onConfirm={resetSelectedSpecieId}
        />
      ) : null}
    </div>
  );
}
