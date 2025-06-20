import React from "react";
import { Controller, type useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { type SpecieFormType } from "../add-specie-dialog";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import { useGetTaxons } from "../../../taxonomy/api";
import { useGetCharacteristics } from "../../../characteristics/api";
import { AsyncSelect } from "~/components/ui/async-select";

type CharacteristicInfoFormProps = {
  form: ReturnType<typeof useForm<SpecieFormType>>;
  isReadOnly?: boolean;
};
export const CharacteristicInfoForm: React.FC<CharacteristicInfoFormProps> = ({
  form,
  isReadOnly,
}) => {
  const characteristicsHook = useDebouncedInput();

  const taxonInput = useDebouncedInput();

  const taxonomyQuery = useGetTaxons({
    limit: taxonInput.pageLimit,
    page: taxonInput.curentPage,
    name: taxonInput.debouncedInput,
  });

  const characteristicsQuery = useGetCharacteristics({
    name: characteristicsHook.debouncedInput,
    limit: characteristicsHook.pageLimit,
    page: characteristicsHook.curentPage,
  });

  const taxonOptions =
    taxonomyQuery.data?.data?.map((t) => ({
      label: `${t.name} - (${t.hierarchy.name})`,
      value: String(t.id),
    })) ?? [];

  const characteristicOptions =
    characteristicsQuery?.data?.data?.map((c) => ({
      value: String(c.id),
      label: c.name,
    })) ?? [];

  return (
    <div className="flex flex-1 flex-col gap-2">
      <FormField
        control={form.control}
        name={"taxonomy"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Taxonomia (*)</FormLabel>
            <FormControl>
              <Controller
                name={field.name}
                control={form.control}
                render={() => (
                  <AsyncSelect
                    name="taxonomy"
                    control={form.control}
                    onInputChange={taxonInput.onInputChange}
                    isLoading={taxonomyQuery.isLoading}
                    options={taxonOptions}
                    defaultValue={field.value}
                    isDisabled={isReadOnly}
                    placeholder="Pesquisar taxonomia"
                  />
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={"characteristics"}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Características (*)</FormLabel>
            <FormControl>
              <Controller
                name={field.name}
                control={form.control}
                render={() => (
                  <AsyncSelect
                    name="characteristics"
                    control={form.control}
                    onInputChange={characteristicsHook.onInputChange}
                    isLoading={characteristicsQuery.isLoading}
                    options={characteristicOptions}
                    defaultValue={field.value}
                    placeholder="Pesquisar características"
                    isDisabled={isReadOnly}
                    isMulti
                  />
                )}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
