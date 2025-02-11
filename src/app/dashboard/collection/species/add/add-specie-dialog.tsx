import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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

import { z } from "zod";
import { type Nullable } from "~/types";
import { type Specie } from "../types";
import ImageManager from "~/app/dashboard/shared/components/image-manager";
import Select from "react-select";
import { GeneralInfoForm } from "./components/general-info-form";
import { Button } from "~/components/ui/button";

type AddSpecieDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<Specie>;
  showDescription?: boolean;
};

const formSpecieSchema = z.object({
  commonName: z.string({ required_error: "Campo obrigatório" }),
  scientificName: z.string({
    required_error: "Campo obrigatório",
  }),
  description: z.string({
    required_error: "Campo obrigatório",
  }),
  images: z.array(z.string(), {
    required_error: "Campo obrigatório",
  }),
  taxonomyId: z.object(
    { value: z.string(), label: z.string() },
    {
      required_error: "Campo obrigatório",
      invalid_type_error: "Campo obrigatório",
    },
  ),
  characteristics: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .optional(),
});

export type SpecieFormType = z.infer<typeof formSpecieSchema>;
export const AddSpecieDialog: React.FC<AddSpecieDialogProps> = ({
  dialogActionTitle,
  isOpen,
  onClose,
  data,
  showDescription,
}) => {
  const form = useForm<SpecieFormType>({
    resolver: zodResolver(formSpecieSchema),
    defaultValues: {
      commonName: data?.commonName,
      scientificName: data?.scientificName,
      description: data?.description,
      images: data?.images,
    },
  });

  function onSubmit(values: SpecieFormType) {
    console.log(values);
  }

  function onCloseAddDialog() {
    onClose();
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAddDialog}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{dialogActionTitle} Espécie</DialogTitle>
          {showDescription !== false && (
            <DialogDescription>
              Preencha os campos abaixo para {dialogActionTitle.toLowerCase()}{" "}
              uma espécie.
            </DialogDescription>
          )}
        </DialogHeader>
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
