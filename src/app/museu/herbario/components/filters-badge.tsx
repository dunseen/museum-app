import { XCircle } from "lucide-react";
import React from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { type PostSearchParams } from "../context/post-context";

type FiltersBadgeProps = {
  search: PostSearchParams;
  handleClearAllFilters: () => void;
};
export const FiltersBadge: React.FC<Readonly<FiltersBadgeProps>> = ({
  search,
  handleClearAllFilters,
}) => {
  if (!search.characteristics?.length && !search?.family && !search?.genus)
    return null;

  const characteristics = search.characteristics;
  const familyCount = search.family ? 1 : 0;
  const genusCount = search.genus ? 1 : 0;

  const count = (characteristics?.length ?? 0) + familyCount + genusCount;

  return (
    <div className="mb-2 flex items-center gap-2">
      <Badge
        title="Filtros aplicados"
        className="cursor-pointer"
        variant="default"
      >
        {count} {count > 1 ? "Filtros aplicados" : "Filtro aplicado"}
      </Badge>
      <Button
        title="Limpar filtros"
        size={"icon"}
        variant={"ghost"}
        className="h-4 w-4"
        onClick={handleClearAllFilters}
      >
        <XCircle className="h-4 w-4" />
      </Button>
    </div>
  );
};
