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
import { FilterIcon, Search } from "lucide-react";

export default function PlantSearch() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="mb-8">
      <div className="mb-4 flex gap-2">
        <Input placeholder="Pesquisar..." className="flex-grow" />
        <Button
          variant="outline"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <FilterIcon className="mr-2 h-4 w-4" /> Filtros
        </Button>
        <Button>
          <Search className="mr-2 h-4 w-4" /> Buscar
        </Button>
      </div>

      {isFiltersOpen && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="taxonomy">
            <AccordionTrigger>Taxonomia</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div>
                  <Label>Família</Label>
                  <Input placeholder="ex., Fabaceae" />
                </div>
                <div>
                  <Label>Gênero</Label>
                  <Input placeholder="ex., Acacia" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="characteristics">
            <AccordionTrigger>Características</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <div>
                  <Label>Tipo de folha</Label>
                  <div className="mt-2 space-y-2">
                    {["Simples", "Composta Bipinada", "Composta Pinada"].map(
                      (type) => (
                        <Label
                          key={type}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`leaf-${type}`} />
                          <span>{type}</span>
                        </Label>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <Label>Color da flor</Label>
                  <div className="mt-2 space-y-2">
                    {["Vermelho", "Amarelo", "Branco", "Roxa", "Azul"].map(
                      (color) => (
                        <Label
                          key={color}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox id={`flower-${color}`} />
                          <span>{color}</span>
                        </Label>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
