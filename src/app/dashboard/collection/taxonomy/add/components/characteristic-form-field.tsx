import { type useForm } from "react-hook-form";
import { type TaxonomyFormType } from "../add-taxonomy-dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { type useDebouncedInput } from "~/hooks/use-debounced-input";
import Select from "react-select";
import { useGetCharacteristics } from "../../../characteristics/api";

type CharacteristicFormFieldProps = {
  form: ReturnType<typeof useForm<TaxonomyFormType>>;
  debouncedInputHook: ReturnType<typeof useDebouncedInput>;
  defaultValue?: {
    value: string;
    label: string;
  }[];
};

export const CharacteristicFormField: React.FC<
  CharacteristicFormFieldProps
> = ({ form, debouncedInputHook, defaultValue }) => {
  const { curentPage, debouncedInput, onInputChange, pageLimit } =
    debouncedInputHook;

  const getCharacteristics = useGetCharacteristics({
    name: debouncedInput,
    limit: pageLimit,
    page: curentPage,
  });

  const characteristicOptions =
    getCharacteristics?.data?.data?.map((c) => ({
      value: String(c.id),
      label: c.name,
    })) ?? [];

  return (
    <FormField
      control={form.control}
      name={"characteristics"}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Características (opcional)</FormLabel>
          <FormControl>
            <Select
              name="characteristics"
              onInputChange={onInputChange}
              options={characteristicOptions}
              placeholder="Pesquisar características"
              noOptionsMessage={() => "Nenhum dado encontrado"}
              id={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              defaultValue={defaultValue}
              isDisabled={field.disabled}
              loadingMessage={() => "Carregando..."}
              isLoading={
                getCharacteristics.isLoading || getCharacteristics.isFetching
              }
              ref={field.ref}
              isMulti
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
