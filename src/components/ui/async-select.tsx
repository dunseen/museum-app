import { useState } from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import { type GroupBase } from "react-select";

interface OptionType {
  label: string;
  value: string;
}

interface AsyncSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  options: OptionType[];
  placeholder?: string;
  isMulti?: boolean;
  isLoading?: boolean;
  onInputChange?: (value: string) => void;
}

export const AsyncSelect = <T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Pesquisar...",
  isMulti = false,
  isLoading,
  onInputChange,
}: AsyncSelectProps<T>) => {
  const { field } = useController({ name, control });

  return (
    <CreatableSelect
      {...field}
      options={options}
      isClearable
      isSearchable
      isMulti={isMulti}
      formatCreateLabel={(input) => `Criar ${input}`}
      placeholder={placeholder}
      onInputChange={onInputChange}
      noOptionsMessage={() => "Nenhum resultado encontrado"}
      loadingMessage={() => "Carregando..."}
      getOptionValue={(option) => option.value}
      isLoading={isLoading}
    />
  );
};
