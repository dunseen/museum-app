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
import { type Characteristic } from "./types";
import { useRouter } from "next/navigation";

export function useCharacteristicTable() {
  const router = useRouter();

  const [selectedCharacteristicId, setSelectedCharacteristicId] = useState<
    string | null
  >(null);

  const [selectedCharacteristicImages, setSelectedCharacteristicImages] =
    useState<{
      name: string;
      images: string[];
    } | null>(null);

  const resetSelectedCharacteristicImages = () =>
    setSelectedCharacteristicImages(null);
  const resetSelectedCharacteristicId = () => setSelectedCharacteristicId(null);

  const onEditCharacteristic = useCallback(
    (name: string) => {
      const encodedName = encodeURIComponent(name);
      router.push(`/dashboard/collection/characteristics/${encodedName}/edit`);
    },
    [router],
  );

  const columns = useMemo<ColumnDef<Characteristic>[]>(
    () => [
      {
        header: "Nome",
        accessorKey: "name",
      },
      {
        header: "Tipo",
        accessorKey: "type",
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
        header: "Imagens",
        accessorKey: "images",
        cell: ({ row }) => {
          return (
            <Button
              variant={"ghost"}
              onClick={() => setSelectedCharacteristicImages(row.original)}
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
                  onClick={() => onEditCharacteristic(row.original.name)}
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedCharacteristicId(row.original.id)}
                >
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [onEditCharacteristic],
  );

  return {
    columns,
    resetSelectedCharacteristicImages,
    resetSelectedCharacteristicId,
    selectedCharacteristicId,
    selectedCharacteristicImages,
  };
}
