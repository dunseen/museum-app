"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { formSpecieSchema, type SpecieFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import ImageManager from "~/app/dashboard/shared/components/image-manager";
import Select from "react-select";
import { GeneralInfoForm } from "./general-info-form";
type SpecieFormProps = {
  data?: SpecieFormType;
  title: string;
};
export const SpecieForm: React.FC<SpecieFormProps> = ({ data, title }) => {
  const router = useRouter();
  const form = useForm<SpecieFormType>({
    resolver: zodResolver(formSpecieSchema),
    defaultValues: data,
  });

  function onSubmit(values: SpecieFormType) {
    console.log(values);
  }

  function onGoBack() {
    form.reset();
    router.back();
  }

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
          <h1 className="text-xl font-bold">{title} Espécie</h1>
        </div>

        <Button form="edit-specie-form" type="submit" title="Salvar">
          Salvar
        </Button>
      </header>
      <Form {...form}>
        <form id="edit-specie-form" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <GeneralInfoForm form={form} />
              <div className="flex flex-1 flex-col gap-2">
                <FormField
                  control={form.control}
                  name={"taxonomyId"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taxonomia (*)</FormLabel>
                      <FormControl>
                        <Controller
                          name={field.name}
                          control={form.control}
                          render={({ field }) => (
                            <Select
                              defaultValue={field.value}
                              id={field.name}
                              ref={field.ref}
                              name={field.name}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              isDisabled={field.disabled}
                              placeholder="Pesquisar taxonomia"
                              options={[
                                {
                                  label: "Taxonomia 1",
                                  value: "taxonomia 1",
                                },
                                {
                                  label: "Taxonomia 2",
                                  value: "taxonomia 2",
                                },
                                {
                                  label: "Taxonomia 3",
                                  value: "taxonomia 3",
                                },
                              ]}
                              isClearable
                              isSearchable
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
                              defaultValue={field.value}
                              id={field.name}
                              ref={field.ref}
                              name={field.name}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              isDisabled={field.disabled}
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
            <FormField
              control={form.control}
              name={"images"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagens (*)</FormLabel>
                  <FormControl>
                    <Controller
                      name={field.name}
                      control={form.control}
                      defaultValue={[]}
                      render={({ field }) => (
                        <ImageManager
                          existingImages={field.value}
                          onImagesChange={(newImages) =>
                            field.onChange(newImages)
                          }
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </>
  );
};
