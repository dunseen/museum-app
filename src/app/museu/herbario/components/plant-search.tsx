"use client";

import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Checkbox } from "~/components/ui/checkbox";
import { FilterIcon, FilterXIcon, Search } from "lucide-react";
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

  const onCheckedChange = (id: number) => {
    const parsedId = String(id);

    handleCharacteristicFilter(parsedId);
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
          <Button
            variant="outline"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            {isFiltersOpen ? (
              <FilterXIcon className="mr-2 h-4 w-4" />
            ) : (
              <FilterIcon className="mr-2 h-4 w-4" />
            )}
            Filtros
          </Button>
        </div>
      </div>

      <FiltersBadge search={search} handleClearAllFilters={onClearFilters} />

      {isFiltersOpen && (
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
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
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
              <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {data?.map((item) => (
                  <li key={item.type}>
                    <Label className="capitalize">{item.type}</Label>
                    <ul className="mt-2 space-y-2">
                      {item.characteristics.map((characteristic) => (
                        <li key={characteristic.id}>
                          <Label className="flex items-center space-x-2">
                            <Checkbox
                              value={characteristic.id}
                              defaultChecked={search?.characteristics?.includes(
                                String(characteristic.id),
                              )}
                              onCheckedChange={() =>
                                onCheckedChange(characteristic.id)
                              }
                              id={`characteristic-${characteristic.id}`}
                            />
                            <span>{characteristic.name}</span>
                          </Label>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
