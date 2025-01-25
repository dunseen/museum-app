import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { type Taxonomy } from "../types";

type AddTaxonomyDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<Taxonomy>;
};

const formTaxonomySchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }),
  hierarchy: z.object(
    { value: z.number(), label: z.string() },
    {
      required_error: "Campo obrigatório",
    },
  ),
  parentId: z.number().optional(),
  characteristics: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

export type TaxonomyFormType = z.infer<typeof formTaxonomySchema>;
export const AddTaxonomyDialog: React.FC<AddTaxonomyDialogProps> = ({
  dialogActionTitle,
  isOpen,
  onClose,
  data,
}) => {
  const form = useForm<TaxonomyFormType>({
    resolver: zodResolver(formTaxonomySchema),
    defaultValues: {
      name: data?.name ?? "",
      hierarchy: data?.hierarchy && {
        label: data?.hierarchy.name,
        value: data?.hierarchy.id,
      },
      characteristics: data?.characteristics?.map((c) => ({
        label: c.name,
        value: c.id,
      })),
      parentId: data?.parent?.id ?? undefined,
    },
  });

  function onSubmit(values: TaxonomyFormType) {
    console.log(values);
  }

  const taxonomyLevels = [
    { value: 1, label: "Reino" },
    { value: 2, label: "Divisão" },
    { value: 3, label: "Classe" },
    { value: 4, label: "Ordem" },
    { value: 5, label: "Família" },
    { value: 6, label: "Gênero" },
  ];

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
                          render={({ field: { value, ...rest } }) => (
                            <Select
                              {...rest}
                              defaultValue={value}
                              placeholder="Selecione a hierarquia"
                              options={taxonomyLevels}
                              isClearable
                              isSearchable
                              maxMenuHeight={150}
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
                  name="parentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxonomia Pai (opcional)</FormLabel>
                      <FormControl>
                        <Controller
                          name={field.name}
                          control={form.control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder="Pesquisar taxonomia pai"
                              isClearable
                              isSearchable
                              maxMenuHeight={150}
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
                          render={({ field }) => (
                            <Select
                              {...field}
                              placeholder="Pesquisar características"
                              options={[
                                {
                                  label: "Característica 1",
                                  value: "característica 1",
                                },
                                {
                                  label: "Característica 2",
                                  value: "característica 2",
                                },
                                {
                                  label: "Característica 3",
                                  value: "característica 3",
                                },
                              ]}
                              isClearable
                              isSearchable
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
