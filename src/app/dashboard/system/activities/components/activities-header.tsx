"use client";

import { TablePagination } from "~/app/dashboard/shared/components/table-pagination";
import { Input } from "~/components/ui/input";
import Select from "react-select";
import { DatePickerWithRange } from "~/components/ui/date-range-picker";
import { Button } from "~/components/ui/button";
import { FilterX } from "lucide-react";
export const ActivitiesHeader: React.FC = () => {
  return (
    <header className="z-10 mb-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <Input
          className="max-w-[300px]"
          placeholder="Busca por autor, validador"
        />
        <div className="flex gap-4">
          <Select
            id="status"
            className="min-w-fit"
            isSearchable={false}
            isMulti
            options={[
              { value: "pending", label: "Pendentes" },
              { value: "approved", label: "Aprovadas" },
              { value: "rejected", label: "Rejeitadas" },
            ]}
            placeholder="Filtrar por status"
          />
          <DatePickerWithRange />
          <Button
            title="limpar filtros"
            variant="ghost"
            size={"icon"}
            className="text-muted-foreground"
          >
            <FilterX />
          </Button>
        </div>
      </div>
      <TablePagination
        currentPage={1}
        onPageChange={(a) => console.log(a)}
        totalPages={20}
      />
    </header>
  );
};
