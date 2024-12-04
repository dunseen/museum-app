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
import Link from "next/link";

export function useTaxonomyTable() {
  const [selectedTaxonomyId, setSelectedTaxonomyId] = useState<string | null>(
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
                <Link
                  href={`/dashboard/collection/taxonomy/${row.original.name}/edit`}
                  prefetch={true}
                >
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                </Link>
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
