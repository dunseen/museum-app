import { Input } from "~/components/ui/input";
import { TablePagination } from "./table-pagination";
import { type TaxonomyFilters } from "../../collection/species/types";
import Select from "react-select";
import { Button } from "~/components/ui/button";
import { FilterIcon, FilterXIcon } from "lucide-react";
import { useDisclosure } from "~/hooks/use-disclosure";
import { Label } from "~/components/ui/label";

type HeaderFiltersAndPaginationProps = {
  searchValue: string;
  onSearchChange: (searchValue: string) => void;
  searchPlaceholder?: string;
  taxonomyFilters: TaxonomyFilters;
  handleTaxonomyChange: (level: string, value: string | null) => void;
};

export const HeaderFiltersAndPagination: React.FC<
  HeaderFiltersAndPaginationProps
> = ({
  searchValue,
  taxonomyFilters,
  handleTaxonomyChange,
  searchPlaceholder,
  onSearchChange,
}) => {
  const filterDisclosure = useDisclosure();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2">
        <Input
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
        />
        <Button
          onClick={filterDisclosure.onToggle}
          size={"icon"}
          variant={"ghost"}
          title="Filtros"
        >
          {!filterDisclosure.isOpen ? (
            <FilterIcon color="gray" />
          ) : (
            <FilterXIcon color="gray" />
          )}
        </Button>
      </div>

      {filterDisclosure.isOpen ? (
        <TaxonomyFilter
          filters={taxonomyFilters}
          onChange={handleTaxonomyChange}
        />
      ) : null}

      <TablePagination
        currentPage={1}
        onPageChange={(a) => console.log(a)}
        totalPages={20}
      />
    </div>
  );
};

const TaxonomyFilter: React.FC<{
  filters: TaxonomyFilters;
  onChange: (level: string, value: string | null) => void;
}> = ({ filters, onChange }) => {
  const taxonomyLevels = [
    { name: "division", label: "Divisão", dependent: null },
    { name: "class", label: "Classe", dependent: "division" },
    { name: "order", label: "Ordem", dependent: "class" },
    { name: "family", label: "Família", dependent: "order" },
    { name: "genus", label: "Gênero", dependent: "family" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 rounded-sm bg-zinc-50 p-2">
      {taxonomyLevels.map((level) => (
        <div className="flex min-w-56 flex-col gap-2" key={level.name}>
          <Label>{level.label}</Label>
          <Select
            value={filters[level.name as keyof TaxonomyFilters]}
            onChange={(value) => onChange(level.name, value)}
            options={[]}
            isDisabled={Boolean(level.dependent)}
          />
        </div>
      ))}
    </div>
  );
};
