import {
  type PathValue,
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { type GroupBase } from "react-select";
import CreatableSelect from "react-select/creatable";

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
  isDisabled?: boolean;
  onInputChange?: (value: string) => void;
  defaultValue?: PathValue<T, Path<T>>;
}

export const AsyncSelect = <T extends FieldValues>({
  name,
  control,
  options,
  placeholder = "Pesquisar...",
  isMulti = false,
  isLoading,
  isDisabled,
  defaultValue,
  onInputChange,
}: AsyncSelectProps<T>) => {
  const { field } = useController({ name, control });

  return (
    <CreatableSelect
      defaultValue={defaultValue}
      id={field.name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      name={field.name}
      ref={field.ref}
      isDisabled={field.disabled ?? isDisabled}
      options={options as unknown as GroupBase<PathValue<T, Path<T>>>[]}
      isClearable
      isSearchable
      isMulti={isMulti}
      formatCreateLabel={(input) => `Criar ${input}`}
      placeholder={placeholder}
      onInputChange={onInputChange}
      noOptionsMessage={() => "Nenhum resultado encontrado"}
      loadingMessage={() => "Carregando..."}
      getOptionValue={(option) => option.value as Path<T>}
      isLoading={isLoading}
    />
  );
};
