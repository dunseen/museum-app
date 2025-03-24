import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

import Select from "react-select";

import { z } from "zod";
import { type Nullable } from "~/types";
import { type GetTaxonsApiResponse } from "~/app/museu/herbario/types/taxonomy.types";
import { useGetHierarchies } from "../api/useGetHierarchy";
import { AsyncSelect } from "~/components/ui/async-select";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import { useGetCharacteristics } from "../../characteristics/api";
import { useGetTaxons } from "../api";

type AddTaxonomyDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<GetTaxonsApiResponse>;
};

const formTaxonomySchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }),
  hierarchy: z.object(
    { value: z.number(), label: z.string(), __isNew__: z.boolean().optional() },
    {
      required_error: "Campo obrigatório",
    },
  ),
  parent: z
    .object({
      value: z.number(),
      label: z.string(),
      __isNew__: z.boolean().optional(),
    })
    .optional(),
  characteristics: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        __isNew__: z.boolean().optional(),
      }),
    )
    .optional(),
});

export type TaxonomyFormType = z.infer<typeof formTaxonomySchema>;
export const AddTaxonomyDialog: React.FC<AddTaxonomyDialogProps> = ({
  dialogActionTitle,
  isOpen,
  onClose,
  data,
}) => {
  const hierarchyHook = useDebouncedInput();
  const characteristicsHook = useDebouncedInput();
  const taxonomyHook = useDebouncedInput();

  const getHierarchies = useGetHierarchies({
    name: hierarchyHook.debouncedInput,
    limit: hierarchyHook.pageLimit,
    page: hierarchyHook.curentPage,
  });

  const getCharacteristics = useGetCharacteristics({
    name: characteristicsHook.debouncedInput,
    limit: characteristicsHook.pageLimit,
    page: characteristicsHook.curentPage,
  });

  const getTaxons = useGetTaxons({
    name: characteristicsHook.debouncedInput,
    limit: characteristicsHook.pageLimit,
    page: characteristicsHook.curentPage,
  });

  const form = useForm<TaxonomyFormType>({
    resolver: zodResolver(formTaxonomySchema),
    defaultValues: {
      name: data?.name,
      hierarchy: data?.hierarchy?.id
        ? {
            value: data?.hierarchy.id,
            label: data?.hierarchy.name,
          }
        : undefined,
      characteristics: data?.characteristics?.map((c) => ({
        label: c.name,
        value: String(c.id),
      })),
      parent: data?.parent?.id
        ? {
            value: data?.parent?.id,
            label: data?.parent?.name,
          }
        : undefined,
    },
  });

  function onSubmit(values: TaxonomyFormType) {
    console.log(values);
  }

  const taxonomyLevels = useMemo(
    () =>
      getHierarchies.data?.map((h) => ({
        value: h.id,
        label: h.name,
      })) ?? [],
    [getHierarchies?.data],
  );

  const characteristicOptions = useMemo(
    () =>
      getCharacteristics?.data?.data?.map((c) => ({
        value: c.id,
        label: c.name,
      })) ?? [],
    [getCharacteristics?.data],
  );

  const parentOptions = useMemo(
    () =>
      getTaxons?.data?.data?.map((c) => ({
        value: c.id,
        label: c.name,
      })) ?? [],
    [getTaxons?.data],
  );

  // const taxonomyLevels = [
  //   { value: 1, label: "Reino" },
  //   { value: 2, label: "Divisão" },
  //   { value: 3, label: "Classe" },
  //   { value: 4, label: "Ordem" },
  //   { value: 5, label: "Família" },
  //   { value: 6, label: "Gênero" },
  // ];

  function onCloseAddDialog() {
    onClose();
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAddDialog}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{dialogActionTitle} Taxonomia</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {dialogActionTitle.toLowerCase()} uma
            taxonomia.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="edit-specie-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-4">
                <FormField
                  control={form.control}
                  name="hierarchy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hierarquia (*)</FormLabel>
                      <FormControl>
                        <Controller
                          name={field.name}
                          control={form.control}
                          render={() => (
                            <AsyncSelect
                              name="hierarchy"
                              control={form.control}
                              onInputChange={hierarchyHook.onInputChange}
                              isLoading={getHierarchies.isLoading}
                              options={taxonomyLevels}
                              placeholder="Pesquisar / Criar Hierarquia"
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome (*)</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <FormField
                  control={form.control}
                  name="parent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxonomia Pai (opcional)</FormLabel>
                      <FormControl>
                        <Controller
                          name={field.name}
                          control={form.control}
                          render={() => (
                            <AsyncSelect
                              name="parent"
                              control={form.control}
                              onInputChange={taxonomyHook.onInputChange}
                              isLoading={getTaxons.isLoading}
                              options={parentOptions}
                              placeholder="Pesquisar taxonomia pai"
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
                      <FormLabel>Características (opcional)</FormLabel>
                      <FormControl>
                        <Controller
                          name={field.name}
                          control={form.control}
                          render={() => (
                            <AsyncSelect
                              name="characteristics"
                              control={form.control}
                              onInputChange={characteristicsHook.onInputChange}
                              isLoading={getCharacteristics.isLoading}
                              options={characteristicOptions}
                              placeholder="Pesquisar características"
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
            </div>

            <DialogFooter className="pt-8">
              <Button
                variant={"secondary"}
                type="button"
                onClick={onCloseAddDialog}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
