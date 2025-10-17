"use client";

import { TablePagination } from "~/app/dashboard/shared/components/table-pagination";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import type { ChangeRequestStatus } from "../../api/useGetChangeRequests";
import { useState } from "react";
import { useDebounce } from "react-use";
// import Select from "react-select";
// import { DatePickerWithRange } from "~/components/ui/date-range-picker";
// import { Button } from "~/components/ui/button";
// import { FilterX } from "lucide-react";

type ActivitiesHeaderProps = {
  onSearch: (value: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
  status?: ChangeRequestStatus;
  onStatusChange?: (value: ChangeRequestStatus | undefined) => void;
  // onFilter: (value: string) => void;
  // onDateChange: (value: string) => void;
  // onClearFilters: () => void;
  // onStatusChange: (value: string) => void;
};

type DebouncedInputTextProps = {
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};
function DebouncedInputText({
  onChange,
  placeholder,
  className,
}: DebouncedInputTextProps) {
  const [text, setText] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useDebounce(() => onChange(text), 500, [text]);

  return (
    <Input
      className={className}
      placeholder={placeholder}
      onChange={onInputChange}
    />
  );
}

export const ActivitiesHeader: React.FC<Readonly<ActivitiesHeaderProps>> = ({
  currentPage,
  onPageChange,
  onSearch,
  status,
  onStatusChange,
  totalPages,
}) => {
  return (
    <header className="z-10 mb-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <DebouncedInputText
          className="max-w-[350px]"
          placeholder="Busca por autor, validador ou nome científico"
          onChange={(value) => {
            onSearch(value);
            onPageChange(1);
          }}
        />
        <div className="flex gap-4">
          <Select
            value={(status ?? "all") as string}
            onValueChange={(v) =>
              onStatusChange?.(
                v === "all" ? undefined : (v as ChangeRequestStatus),
              )
            }
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="approved">Aprovados</SelectItem>
              <SelectItem value="rejected">Rejeitados</SelectItem>
              <SelectItem value="withdrawn">Retirados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <TablePagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </header>
  );
};
