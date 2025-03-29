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

  const columns: ColumnDef<GetSpecieApiResponse>[] = useMemo(
    () => [
      {
        header: "Nome científico",
        accessorKey: "scientificName",
      },
      {
        header: "Nome popular",
        accessorKey: "commonName",
      },
      {
        header: "Descrição",
        accessorKey: "description",
        cell: ({ row }) => (
          <p
            title={row.original.description ?? ""}
            className="max-w-96 truncate"
          >
            {row.original.description}
          </p>
        ),
      },
      {
        header: "Família",
        accessorKey: "family",
      },
      {
        header: "Ordem",
        accessorKey: "order",
      },
      {
        header: "Imagens",
        accessorKey: "images",
        cell: ({ row }) => {
          return (
            <Button
              variant={"ghost"}
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
        accessorKey: "location",
        cell: ({ row }) => {
          return <p>{row.original?.location?.address} - {row.original?.location?.city?.name}/{row.original?.location?.state?.code}</p>;
        },
      },
      {
        header: "Data",
        accessorKey: "collectedAt",
        cell: ({ row }) => {
          return <p>{new Date(row.original?.collectedAt).toLocaleString()}</p>;
        }
      },
      {
        header: "Coordenadas",
        accessorKey: "location",
        cell: ({ row }) => {
          return <p>{row.original?.location?.lat} , {row.original?.location?.long}</p>;
        }
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
