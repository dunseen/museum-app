"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

import { DataTable } from "../../shared/components/data-table";
import { useSpecieTable } from "./use-specie-table";
import { ImageCarousel } from "../../shared/components/image-carousel";
import { ConfirmationAlert } from "../../shared/components/confirmation-alert";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { HeaderFiltersAndPagination } from "../../shared/components/header-filters-and-pagination";
import { useHeaderFilters } from "../../shared/hooks/use-header-filters";
import Link from "next/link";

export default function Page() {
  const {
    columns,
    selectedSpecieId,
    selectedSpecieImages,
    resetSelectedSpecieImages,
    resetSelectedSpecieId,
  } = useSpecieTable();

  const { handleTaxonomyChange, onSearchChange, searchValue, taxonomyFilters } =
    useHeaderFilters();

  return (
    <>
      <header className="mb-4 flex justify-between">
        <HeaderFiltersAndPagination
          handleTaxonomyChange={handleTaxonomyChange}
          onSearchChange={onSearchChange}
          searchValue={searchValue}
          taxonomyFilters={taxonomyFilters}
          searchPlaceholder="Busca por nome científico ou popular"
        />
        <Link href="/dashboard/collection/species/add" prefetch={true}>
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
            commonName: "Açaí",
            scientificName: "Euterpe oleracea",
            description:
              "Açaí é uma fruta roxa aaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaaaaaaaaaaaaaaaaaaaaa",
            status: "Publicado",
            class: "Magnoliopsida",
            order: "Arecales",
            family: "Arecaceae",
            division: "Magnoliophyta",
            genus: "Euterpe",
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

      {!!selectedSpecieId ? (
        <ConfirmationAlert
          isOpen={!!selectedSpecieId}
          onClose={resetSelectedSpecieId}
          onCancel={resetSelectedSpecieId}
          onConfirm={resetSelectedSpecieId}
        />
      ) : null}
    </>
  );
}
