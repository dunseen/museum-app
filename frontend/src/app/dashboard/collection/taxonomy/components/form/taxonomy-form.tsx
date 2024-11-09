"use client";

import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { formTaxonomySchema, type TaxonomyFormType } from "./schema";
import Select from "react-select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type AddTaxonomyFormProps = {
  title: string;
  data?: TaxonomyFormType;
};
export const TaxonomyForm: React.FC<AddTaxonomyFormProps> = ({
  title,
  data,
}) => {
  const router = useRouter();
  const form = useForm<TaxonomyFormType>({
    resolver: zodResolver(formTaxonomySchema),
    defaultValues: data,
  });

  function onSubmit(values: TaxonomyFormType) {
    console.log(values);
  }

  function onGoBack() {
    form.reset();
    router.back();
  }

  const taxonomyLevels = [
    { value: "kingdom", label: "Reino" },
    { value: "division", label: "Divisão" },
    { value: "class", label: "Classe" },
    { value: "order", label: "Ordem" },
    { value: "family", label: "Família" },
    { value: "genus", label: "Gênero" },
  ];

  return (
    <>
      <header className="mb-12 flex justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant={"outline"}
            className="rounded-full"
            title="Voltar"
            size={"icon"}
            onClick={onGoBack}
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="text-xl font-bold">{title} Taxonomia</h1>
        </div>

        <Button form="edit-specie-form" type="submit" title="Salvar">
          Salvar
        </Button>
      </header>
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
                        render={({ field }) => (
                          <Select
                            {...field}
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
        </form>
      </Form>
    </>
  );
};
