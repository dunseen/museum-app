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
import ImageManager from "~/app/dashboard/shared/components/image-manager";
import { GeneralInfoForm } from "./components/general-info-form";
import { Button } from "~/components/ui/button";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { AsyncSelect } from "~/components/ui/async-select";
import { useGetTaxons } from "../../taxonomy/api";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import { useGetCharacteristics } from "../../characteristics/api";
import { usePostSpecies } from "../api";
import { toast } from "sonner";
import { appendFiles } from "~/utils/files";

type AddSpecieDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<GetSpecieApiResponse>;
  isReadOnly?: boolean;
  showDescription?: boolean;
};

const formSpecieSchema = z.object({
  commonName: z.string().optional(),
  scientificName: z.string({
    required_error: "Campo obrigatório",
  }),
  description: z.string({
    required_error: "Campo obrigatório",
  }),
  images: z
    .array(z.string(), {
      required_error: "Campo obrigatório",
    })
    .nonempty("Campo obrigatório"),
  taxonomyId: z
    .array(
      z.object(
        { value: z.string(), label: z.string() },
        {
          required_error: "Campo obrigatório",
          invalid_type_error: "Campo obrigatório",
        },
      ),
    )
    .nonempty("Campo obrigatório"),
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
  const characteristicsHook = useDebouncedInput();
  const taxonInput = useDebouncedInput();

  const postSpeciesMutation = usePostSpecies();

  const taxonomyQuery = useGetTaxons({
    limit: taxonInput.pageLimit,
    page: taxonInput.curentPage,
    name: taxonInput.inputValue,
  });

  const characteristicsQuery = useGetCharacteristics({
    name: characteristicsHook.debouncedInput,
    limit: characteristicsHook.pageLimit,
    page: characteristicsHook.curentPage,
  });

  const taxonOptions =
    taxonomyQuery.data?.data?.map((t) => ({
      label: t.name,
      value: String(t.id),
    })) ?? [];

  const characteristicOptions =
    characteristicsQuery?.data?.data?.map((c) => ({
      value: String(c.id),
      label: c.name,
    })) ?? [];

  const form = useForm<SpecieFormType>({
    resolver: zodResolver(formSpecieSchema),
    defaultValues: {
      commonName: data?.commonName,
      scientificName: data?.scientificName,
      description: data?.description ?? undefined,
      images: data?.files?.map((file) => file.url) ?? [],
      characteristics: data?.characteristics?.map((c) => ({
        value: String(c.id),
        label: c.name,
      })),
      taxonomyId: [],
    },
  });

  async function onSubmit(values: SpecieFormType) {
    try {
      const formData = new FormData();

      if (values.commonName) {
        formData.append("commonName", values.commonName);
      }

      formData.append("scientificName", values.scientificName);
      formData.append(
        "taxonIds",
        JSON.stringify(values.taxonomyId.map((t) => t.value)),
      );
      formData.append("description", values.description);
      formData.append(
        "characteristicIds",
        JSON.stringify(values.characteristics?.map((c) => c.value) ?? []),
      );

      await appendFiles(formData, "file", values.images);

      await postSpeciesMutation.mutateAsync(formData);

      toast.warning("Espécie enviada para aprovação");
      onCloseAddDialog();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar espécie");
    }
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
                            render={() => (
                              <AsyncSelect
                                name="taxonomyId"
                                control={form.control}
                                onInputChange={taxonInput.onInputChange}
                                isLoading={taxonomyQuery.isLoading}
                                options={taxonOptions}
                                placeholder="Pesquisar taxonomia"
                                isMulti
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
                                onInputChange={
                                  characteristicsHook.onInputChange
                                }
                                isLoading={characteristicsQuery.isLoading}
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
              <FormField
                control={form.control}
                name={"images"}
                render={({ field }) => (
                  <FormItem className="max-w-[750px] overflow-x-auto">
                    <FormLabel>Imagens (*)</FormLabel>
                    <FormControl>
                      <Controller
                        name={field.name}
                        control={form.control}
                        // defaultValue={[]}
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
                disabled={postSpeciesMutation.isPending}
                variant={"secondary"}
                type="button"
                onClick={onCloseAddDialog}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={postSpeciesMutation.isPending}
                isLoading={postSpeciesMutation.isPending}
              >
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
