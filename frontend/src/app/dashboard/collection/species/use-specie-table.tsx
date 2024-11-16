/* eslint-disable jsx-a11y/alt-text */
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { Image, MoreHorizontal } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type Specie } from "./types";
import { useRouter } from "next/navigation";

export function useSpecieTable() {
  const router = useRouter();
  const [selectedSpecieId, setSelectedSpecieId] = useState<string | null>(null);

  const [selectedSpecieImages, setSelectedSpecieImages] = useState<{
    commonName: string;
    images: string[];
  } | null>(null);

  const resetSelectedSpecieImages = () => setSelectedSpecieImages(null);
  const resetSelectedSpecieId = () => setSelectedSpecieId(null);

  const onEditClick = useCallback(
    (specieName: string) => {
      const encodedSpecieName = encodeURIComponent(specieName.toLowerCase());

      router.push(`/dashboard/collection/species/${encodedSpecieName}/edit`);
    },
    [router],
  );

  const columns: ColumnDef<Specie>[] = useMemo(
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
          <p title={row.original.description} className="max-w-96 truncate">
            {row.original.description}
          </p>
        ),
      },
      {
        header: "Família",
        accessorKey: "family",
      },
      {
        header: "Classe",
        accessorKey: "class",
      },
      {
        header: "Ordem",
        accessorKey: "order",
      },
      {
        header: "Gênero",
        accessorKey: "genus",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Imagens",
        accessorKey: "images",
        cell: ({ row }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() => setSelectedSpecieImages(row.original)}
            >
              <Image />
            </Button>
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
                  onClick={() => onEditClick(row.original.commonName)}
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
    [onEditClick],
  );

  return {
    columns,
    selectedSpecieId,
    selectedSpecieImages,
    resetSelectedSpecieImages,
    resetSelectedSpecieId,
  };
}
