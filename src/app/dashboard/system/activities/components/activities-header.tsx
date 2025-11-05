"use client";

import { useMemo, useState } from "react";
import { useDebounce } from "react-use";
import { TablePagination } from "~/app/dashboard/shared/components/table-pagination";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Label } from "~/components/ui/label";
import {
  type ChangeRequestAction,
  type ChangeRequestStatus,
} from "../../api/useGetChangeRequests";
import { cn } from "~/lib/utils";

type ActivitiesHeaderProps = {
  onSearch: (value: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (value: number) => void;
  status?: ChangeRequestStatus;
  onStatusChange?: (value: ChangeRequestStatus | undefined) => void;
  action?: ChangeRequestAction;
  onActionChange?: (value: ChangeRequestAction | undefined) => void;
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
  action,
  onActionChange,
  totalPages,
}) => {
  const selectItems = useMemo(
    () => ({
      action: [
        { value: "all", label: "Todas as ações" },
        { value: "create", label: "Criação" },
        { value: "update", label: "Atualização" },
        { value: "delete", label: "Remoção" },
      ],
      status: [
        { value: "all", label: "Todos os status" },
        { value: "pending", label: "Pendentes" },
        { value: "approved", label: "Aprovados" },
        { value: "rejected", label: "Rejeitados" },
        { value: "withdrawn", label: "Retirados" },
      ],
    }),
    [],
  );

  return (
    <header className="z-10 mb-4 flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-4">
        <FilterField
          label="Buscar"
          className="flex-1 min-w-[220px]"
          input={
            <DebouncedInputText
              className="w-full"
              placeholder="Busque por autor, validador ou nome científico"
              onChange={(value) => {
                onSearch(value);
                onPageChange(1);
              }}
            />
          }
        />

        <FilterField
          label="Solicitação"
          className="w-full max-w-xs"
          input={
            <Select
              value={action ?? "all"}
              onValueChange={(value) =>
                onActionChange?.(
                  value === "all" ? undefined : (value as ChangeRequestAction),
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {selectItems.action.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />

        <FilterField
          label="Status"
          className="w-full max-w-xs"
          input={
            <Select
              value={status ?? "all"}
              onValueChange={(value) =>
                onStatusChange?.(
                  value === "all" ? undefined : (value as ChangeRequestStatus),
                )
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {selectItems.status.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          }
        />
      </div>

      <TablePagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPages={totalPages}
      />
    </header>
  );
};

type FilterFieldProps = {
  label: string;
  input: React.ReactNode;
  className?: string;
};

function FilterField({ label, input, className }: FilterFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      {input}
    </div>
  );
}
