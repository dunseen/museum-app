import type React from "react";
import { Controller, type useForm } from "react-hook-form";
import { type SpecieFormType } from "./schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import Select from "react-select";

type TaxonomyFormProps = {
  form: ReturnType<typeof useForm<SpecieFormType>>;
};
export const TaxonomyForm: React.FC<TaxonomyFormProps> = ({ form }) => {
  const { control } = form;

  const taxonomyLevels = [
    { name: "division", label: "Filo", dependent: "kingdom" },
    { name: "class", label: "Classe", dependent: "division" },
    { name: "order", label: "Ordem", dependent: "class" },
    { name: "family", label: "Família", dependent: "order" },
    { name: "genus", label: "Gênero", dependent: "family" },
  ];

  return (
    <>
      {taxonomyLevels.map((level) => (
        <FormField
          key={level.name}
          control={control}
          name={level.name as keyof SpecieFormType}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{level.label}</FormLabel>
              <FormControl>
                <Controller
                  name={level.name as keyof SpecieFormType}
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={[]} // Você preencherá isso com os dados do React Query
                      isDisabled={Boolean(
                        level.dependent &&
                          !form.getValues()[
                            level.dependent as keyof SpecieFormType
                          ],
                      )}
                      placeholder={`Selecione ${level.label.toLowerCase()}`}
                      isClearable
                      isSearchable
                      classNamePrefix="react-select"
                    />
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </>
  );
};
