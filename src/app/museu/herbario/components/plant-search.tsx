"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Label } from "~/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import Select, { type MultiValue } from "react-select";
import { FilterIcon, FilterXIcon } from "lucide-react";
import { usePost } from "../context/post-context";
import { useGetCharacteristicFilters, useGetHierarchies } from "../api";
import { FiltersBadge } from "./filters-badge";

export default function PlantSearch() {
  const [accordionValue, setAccordionValue] = useState<string>("");

  const {
    handleSearch,
    handleCharacteristicFilter,
    handleClearAllFilters,
    search,
  } = usePost();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { data } = useGetCharacteristicFilters();
  const { data: hierarchies } = useGetHierarchies();

  const onCharacteristicGroupChange = (
    groupIds: string[],
    selected: MultiValue<{ value: string; label: string }>,
  ) => {
    const selectedIds = selected.map((o) => o.value);
    const prevSelected =
      search?.characteristics?.filter((id) => groupIds.includes(id)) ?? [];

    const toAdd = selectedIds.filter((id) => !prevSelected.includes(id));
    const toRemove = prevSelected.filter((id) => !selectedIds.includes(id));

    toAdd.forEach((id) => handleCharacteristicFilter(id));
    toRemove.forEach((id) => handleCharacteristicFilter(id));
  };

  const onAccordionChange = (value: string) => {
    setAccordionValue((prev) => (prev === value ? "" : value));
  };

  const onClearFilters = () => {
    handleClearAllFilters();
    setAccordionValue("");
  };

  const handleSearchByTaxon = (id: number, field: string, value: string) => {
    switch (field) {
      case "família":
        handleSearch({
          familyName: value,
          familyHierarchyId: value ? id : undefined,
        });
        break;
      case "gênero":
        handleSearch({
          genusName: value,
          genusHierarchyId: value ? id : undefined,
        });
        break;
      case "ordem":
        handleSearch({
          orderName: value,
          orderHierarchyId: value ? id : undefined,
        });
        break;
      default:
        break;
    }
  };

  return (
    <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
      <div className="mb-8">
        <div className="mb-4 flex flex-wrap gap-2 md:flex-nowrap">
          <Input
            placeholder="Pesquisar por nome cientifico ou popular..."
            onChange={(e) =>
              handleSearch({
                name: e.target.value,
              })
            }
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

      <SheetContent side="left" className="sm:max-w-sm">
        <Accordion
          value={accordionValue}
          onValueChange={onAccordionChange}
          type="single"
          collapsible
          className="w-full"
        >
          <AccordionItem value="taxonomy">
            <AccordionTrigger>Taxonomia</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                {hierarchies?.map((hierarchy) => (
                  <div key={hierarchy.id}>
                    <Label className="capitalize">{hierarchy.name}</Label>
                    <Input
                      placeholder="ex., Fabaceae"
                      onChange={(e) =>
                        handleSearchByTaxon(
                          hierarchy.id,
                          hierarchy.name,
                          e.target.value,
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="characteristics">
            <AccordionTrigger>Características</AccordionTrigger>
            <AccordionContent>
              <ul className="grid grid-cols-2 gap-4">
                {data?.map((item) => {
                  const options = item.characteristics.map((c) => ({
                    value: String(c.id),
                    label: c.name,
                  }));
                  const groupIds = options.map((o) => o.value);
                  const selectedOptions = options.filter((o) =>
                    search?.characteristics?.includes(o.value),
                  );

                  return (
                    <li key={item.type}>
                      <Label className="capitalize">{item.type}</Label>
                      <Select
                        isMulti
                        options={options}
                        className="mt-2"
                        classNamePrefix="react-select"
                        value={selectedOptions}
                        onChange={(selected) =>
                          onCharacteristicGroupChange(groupIds, selected)
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
