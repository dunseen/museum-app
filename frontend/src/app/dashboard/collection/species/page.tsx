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
            commonName: "Perpétua-do-mato",
            scientificName: "Palicourea colorata",
            genus: "Palicourea",
            family: "Rubiaceae",
            class: "Magnoliopsida",
            division: "Magnoliophyta",
            order: "Gentianales",
            description: "Planta de folhas verdes e flores rosas.",
            status: "Publicado",
            images: [
              "https://inaturalist-open-data.s3.amazonaws.com/photos/14296486/medium.jpg",
              "https://inaturalist-open-data.s3.amazonaws.com/photos/58230094/medium.jpeg",
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
