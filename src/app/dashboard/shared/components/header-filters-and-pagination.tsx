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
      </div>

      <TablePagination
        currentPage={1}
        onPageChange={(a) => console.log(a)}
        totalPages={20}
      />
    </div>
  );
};
