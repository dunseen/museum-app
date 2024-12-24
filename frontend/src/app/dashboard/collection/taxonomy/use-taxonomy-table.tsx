/* eslint-disable jsx-a11y/alt-text */
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type Taxonomy } from "./types";

export function useTaxonomyTable() {
  const [selectedTaxonomyId, setSelectedTaxonomyId] = useState<number | null>(
    null,
  );

  const [selectedTaxonomy, setSelectedTaxonomy] = useState<Taxonomy | null>(
    null,
  );

  const resetSelectedTaxonomy = () => setSelectedTaxonomy(null);

  const resetSelectedTaxonomyId = () => setSelectedTaxonomyId(null);

  const columns = useMemo<ColumnDef<Taxonomy>[]>(
    () => [
      {
        header: "Hierarquia",
        accessorKey: "hierarchy",
        cell: ({ row }) => row.original.hierarchy.name,
      },
      {
        header: "Nome",
        accessorKey: "name",
      },
      {
        header: "Dependente",
        accessorKey: "parent.name",
        cell: ({ row }) => row.original.parent?.name ?? "-",
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
                  onClick={() => setSelectedTaxonomy(row.original)}
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedTaxonomyId(row.original.id)}
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
    resetSelectedTaxonomy,
    resetSelectedTaxonomyId,
    selectedTaxonomy,
    selectedTaxonomyId,
  };
}
