'use client';

import { useState } from 'react';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Sheet, SheetTrigger } from '~/components/ui/sheet';
import { FilterIcon, FilterXIcon } from 'lucide-react';
import { usePost } from '../context/post-context';
import { FiltersBadge } from './filters-badge';

import dynamic from 'next/dynamic';

const FiltersContent = dynamic(
  () => import('./filters-content').then((mod) => mod.FiltersContent),
  { ssr: false },
);

export default function PlantSearch() {
  const { handleSearch, handleClearAllFilters, search } = usePost();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const onClearFilters = () => {
    handleClearAllFilters();

    if (isFiltersOpen) setIsFiltersOpen(false);
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch({
      name: e.target.value,
    });
  };
  return (
    <Sheet open={isFiltersOpen} modal={false} onOpenChange={setIsFiltersOpen}>
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2 md:flex-nowrap">
          <Input
            placeholder="Pesquisar por nome cientifico ou popular..."
            onChange={onSearchChange}
          />
          <div className="flex items-center gap-2">
            <SheetTrigger asChild>
              <Button variant="outline">
                {isFiltersOpen ? (
                  <FilterXIcon className="mr-2 h-4 w-4" />
                ) : (
                  <FilterIcon className="mr-2 h-4 w-4" />
                )}
                Filtros
              </Button>
            </SheetTrigger>
          </div>
        </div>

        <FiltersBadge search={search} handleClearAllFilters={onClearFilters} />
      </div>

      <FiltersContent onCloseFilters={onClearFilters} />
    </Sheet>
  );
}
