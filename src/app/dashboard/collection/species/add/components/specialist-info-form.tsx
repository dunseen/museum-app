import React from "react";
import { Controller, type useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { AsyncSelect } from "~/components/ui/async-select";
import { DatePicker } from "~/components/ui/date-picker";
import { type SpecieFormType } from "../add-specie-dialog";
import { useGetSpecialists } from "../../api";
import { useDebouncedInput } from "~/hooks/use-debounced-input";

type SpecialistInfoFormProps = {
  form: ReturnType<typeof useForm<SpecieFormType>>;
  isReadOnly?: boolean;
};

export const SpecialistInfoForm: React.FC<SpecialistInfoFormProps> = ({
  form,
  isReadOnly,
}) => {
  const collectorInput = useDebouncedInput();
  const determinatorInput = useDebouncedInput();

  const collectorsQuery = useGetSpecialists({
    limit: collectorInput.pageLimit,
    page: collectorInput.curentPage,
    name: collectorInput.debouncedInput,
    type: "collector",
  });

  const determinatorsQuery = useGetSpecialists({
    limit: determinatorInput.pageLimit,
    page: determinatorInput.curentPage,
    name: determinatorInput.debouncedInput,
    type: "determinator",
  });

  const collectorOptions =
    collectorsQuery.data?.data?.map((c) => ({
      label: c.name,
      value: String(c.id),
    })) ?? [];

  const determinatorOptions =
    determinatorsQuery.data?.data?.map((c) => ({
      label: c.name,
      value: String(c.id),
    })) ?? [];

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="determinator"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Determinador (*)</FormLabel>
            <FormControl>
              <Controller
                name={field.name}
                control={form.control}
                render={() => (
                  <AsyncSelect
                    name="determinator"
                    control={form.control}
                    onInputChange={determinatorInput.onInputChange}
                    isLoading={determinatorsQuery.isLoading}
                    options={determinatorOptions}
                    defaultValue={field.value}
                    isDisabled={isReadOnly}
                    placeholder="Pesquisar determinador"
                    isCreatable
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
        name="collector"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Coletor (*)</FormLabel>
            <FormControl>
              <Controller
                name={field.name}
                control={form.control}
                render={() => (
                  <AsyncSelect
                    name="collector"
                    control={form.control}
                    onInputChange={collectorInput.onInputChange}
                    isLoading={collectorsQuery.isLoading}
                    options={collectorOptions}
                    defaultValue={field.value}
                    isDisabled={isReadOnly}
                    placeholder="Pesquisar coletor"
                    isCreatable
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
        name="determinatedAt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data de Determinação (*)</FormLabel>
            <FormControl>
              <DatePicker
                onChange={field.onChange}
                value={field.value}
                isDisabled={isReadOnly}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="collectedAt"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data da Coleta (*)</FormLabel>
            <FormControl>
              <DatePicker
                onChange={field.onChange}
                value={field.value}
                isDisabled={isReadOnly}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
