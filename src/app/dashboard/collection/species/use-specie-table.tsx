/* eslint-disable jsx-a11y/alt-text */
'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Image, MoreHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { type GetSpecieApiResponse } from '~/app/museu/herbario/types/specie.types';
import { decimalToDMS } from '~/utils/lat-long';
import { Can } from '../../context/ability-context';
import { formatDate } from '~/utils/date';
import { useGeneratePdf } from '../../system/hooks/useExportPdf';

export function useSpecieTable() {
  const [selectedSpecie, setSelectedSpecie] =
    useState<GetSpecieApiResponse | null>(null);

  const [selectedSpecieId, setSelectedSpecieId] = useState<number | null>(null);

  const [selectedSpecieImages, setSelectedSpecieImages] = useState<{
    commonName: string;
    images: string[];
  } | null>(null);

  const { generatePDF } = useGeneratePdf();

  const resetSelectedSpecieImages = () => setSelectedSpecieImages(null);
  const resetSelectedSpecieId = () => setSelectedSpecieId(null);

  const columns = useMemo<ColumnDef<GetSpecieApiResponse>[]>(
    () => [
      {
        header: 'Nome científico',
        cell: ({ row }) => (
          <p
            title={row.original.scientificName ?? ''}
            className="max-w-96 truncate"
          >
            {row.original.scientificName}
          </p>
        ),
      },
      {
        header: 'Nome popular',
        cell: ({ row }) => (
          <p
            title={row.original.commonName ?? ''}
            className="max-w-96 truncate"
          >
            {row.original.commonName}
          </p>
        ),
      },
      {
        header: 'Descrição',
        cell: ({ row }) => (
          <p
            title={row.original.description ?? ''}
            className="max-w-60 truncate"
          >
            {row.original.description}
          </p>
        ),
      },
      {
        header: 'Família',
        cell: ({ row }) => {
          const family = row.original?.taxons.find(
            (taxon) => taxon?.hierarchy?.name?.toLowerCase() === 'família',
          );

          return (
            <p title={family?.name} className="max-w-80 truncate">
              {family?.name}
            </p>
          );
        },
      },
      {
        header: 'Ordem',
        cell: ({ row }) => {
          const ordem = row.original?.taxons.find(
            (taxon) => taxon?.hierarchy?.name?.toLowerCase() === 'ordem',
          );

          return (
            <p title={ordem?.name} className="max-w-80 truncate">
              {ordem?.name}
            </p>
          );
        },
      },
      {
        header: 'Imagens',
        cell: ({ row }) => {
          return (
            <Button
              variant={'ghost'}
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
        header: 'Coletor',
        cell: ({ row }) => {
          const text = row.original.collector.name;

          return (
            <p title={text} className="max-w-80 truncate">
              {text}
            </p>
          );
        },
      },
      {
        header: 'Determinador',
        cell: ({ row }) => {
          const text = row.original.determinator.name;

          return (
            <p title={text} className="max-w-80 truncate">
              {text}
            </p>
          );
        },
      },
      {
        header: 'Local',
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
        header: 'Coordenadas',
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
        header: 'Data de coleta',
        cell: ({ row }) => {
          const text = formatDate(row.original?.collectedAt);

          return (
            <p title={text} className="max-w-80 truncate">
              {text}
            </p>
          );
        },
      },
      {
        header: 'Data de determinação',
        cell: ({ row }) => {
          const text = formatDate(row.original?.determinatedAt);

          return (
            <p title={text} className="max-w-80 truncate">
              {text}
            </p>
          );
        },
      },
      {
        id: 'actions',
        header: 'Ações',
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
                <Can I="edit" a="Collection">
                  <DropdownMenuItem
                    onClick={() => generatePDF({ specie: row.original })}
                  >
                    Gerar ficha
                  </DropdownMenuItem>
                </Can>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setSelectedSpecie(row.original)}
                >
                  Editar
                </DropdownMenuItem>
                <Can I="delete" a="Collection">
                  <DropdownMenuItem
                    onClick={() => setSelectedSpecieId(row.original.id)}
                  >
                    Deletar
                  </DropdownMenuItem>
                </Can>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [generatePDF],
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
