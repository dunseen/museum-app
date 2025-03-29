/* eslint-disable jsx-a11y/alt-text */
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Image, MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { decimalToDMS } from "~/utils/lat-long";

export function useSpecieTable() {
  const [selectedSpecie, setSelectedSpecie] =
    useState<GetSpecieApiResponse | null>(null);

  const [selectedSpecieId, setSelectedSpecieId] = useState<number | null>(null);

  const [selectedSpecieImages, setSelectedSpecieImages] = useState<{
    commonName: string;
    images: string[];
  } | null>(null);

  const resetSelectedSpecieImages = () => setSelectedSpecieImages(null);
  const resetSelectedSpecieId = () => setSelectedSpecieId(null);

  const columns = useMemo<ColumnDef<GetSpecieApiResponse>[]>(
    () => [
      {
        header: "Nome científico",
        cell: ({ row }) => (
          <p
            title={row.original.scientificName ?? ""}
            className="max-w-96 truncate"
          >
            {row.original.scientificName}
          </p>
        ),
      },
      {
        header: "Nome popular",
        cell: ({ row }) => (
          <p
            title={row.original.commonName ?? ""}
            className="max-w-96 truncate"
          >
            {row.original.commonName}
          </p>
        ),
      },
      {
        header: "Descrição",
        cell: ({ row }) => (
          <p
            title={row.original.description ?? ""}
            className="max-w-60 truncate"
          >
            {row.original.description}
          </p>
        ),
      },
      {
        header: "Família",
        cell: ({ row }) => {
          const family = row.original?.taxons.find(
            (taxon) => taxon?.hierarchy?.toLowerCase() === "família",
          );

          return (
            <p title={family?.name} className="max-w-80 truncate">
              {family?.name}
            </p>
          );
        },
      },
      {
        header: "Ordem",
        cell: ({ row }) => {
          const ordem = row.original?.taxons.find(
            (taxon) => taxon?.hierarchy?.toLowerCase() === "ordem",
          );

          return (
            <p title={ordem?.name} className="max-w-80 truncate">
              {ordem?.name}
            </p>
          );
        },
      },
      {
        header: "Imagens",
        cell: ({ row }) => {
          return (
            <Button
              variant={"ghost"}
              disabled={!row.original?.files.length}
              onClick={() =>
                setSelectedSpecieImages({
                  commonName: row.original.commonName,
                  images: row.original.files.map((f) => f.url),
                })
              }
            >
              <Image />
            </Button>
          );
        },
      },
      {
        header: "Local",
        cell: ({ row }) => {
          const text = `${row.original?.location?.address} - ${row.original?.location?.city?.name}/${row.original?.location?.state?.code}`;

          return (
            <p title={text} className="max-w-80 truncate">
              {text}
            </p>
          );
        },
      },

      {
        header: "Coordenadas",
        cell: ({ row }) => {
          const text = `${decimalToDMS(row.original?.location?.lat, true)} , ${decimalToDMS(row.original?.location?.long, false)}`;
          return (
            <p title={text} className="max-w-80 truncate">
              {text}
            </p>
          );
        },
      },
      {
        header: "Data de coleta",
        cell: ({ row }) => {
          const text = new Date(row.original?.collectedAt).toLocaleString();

          return (
            <p title={text} className="max-w-80 truncate">
              {text}
            </p>
          );
        },
      },
      {
        id: "actions",
        header: "Ações",
        cell: ({ row }) => {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setSelectedSpecie(row.original)}
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedSpecieId(row.original.id)}
                >
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  return {
    columns,
    selectedSpecieId,
    selectedSpecie,
    resetSelectedSpecie: () => setSelectedSpecie(null),
    selectedSpecieImages,
    resetSelectedSpecieImages,
    resetSelectedSpecieId,
  };
}
