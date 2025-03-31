import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
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
import { usePostSpecies, usePutSpecies } from "../api";
import { toast } from "sonner";
import { appendFiles } from "~/utils/files";
import { LocationInfoForm } from "./components/location-info-form";
import { CharacteristicInfoForm } from "./components/characteristic-info-form";

type AddSpecieDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<GetSpecieApiResponse>;
  isReadOnly?: boolean;
};

const stringSchema = z.string({
  required_error: "Campo obrigatório",
  invalid_type_error: "Campo obrigatório",
});
const selectSchema = z.object(
  {
    label: z.string(),
    value: z.string(),
  },
  {
    required_error: "Campo obrigatório",
    invalid_type_error: "Campo obrigatório",
  },
);

const imageSchema = z.object(
  {
    id: z.string(),
    url: z.string(),
    removed: z.boolean().optional(),
    isNew: z.boolean().optional(),
  },
  {
    required_error: "Campo obrigatório",
  },
);

const formSpecieSchema = z.object({
  commonName: z.string().optional().nullable(),
  collectedAt: z.date({
    required_error: "Campo obrigatório",
  }),
  location: z.object({
    lat: z
      .string({ required_error: "Campo obrigatório" })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: "Latitude  deve ser um número válido",
      }),
    long: z
      .string({ required_error: "Campo obrigatório" })
      .refine((val) => !isNaN(parseFloat(val)), {
        message: "Longitude deve ser um número válido",
      }),
    address: stringSchema,
    state: selectSchema,
    city: selectSchema,
  }),
  scientificName: stringSchema,
  description: stringSchema,
  images: z.array(imageSchema, {
    required_error: "Campo obrigatório",
  }),
  taxonomy: selectSchema,
  characteristics: z.array(selectSchema).optional(),
});

export type SpecieFormType = z.infer<typeof formSpecieSchema>;
export const AddSpecieDialog: React.FC<AddSpecieDialogProps> = ({
  dialogActionTitle,
  isOpen,
  onClose,
  data,
  isReadOnly,
}) => {
  const postSpeciesMutation = usePostSpecies();
  const putSpeciesMutation = usePutSpecies();

  const form = useForm<SpecieFormType>({
    resolver: zodResolver(formSpecieSchema),
  });

  async function onSubmit(values: SpecieFormType) {
    try {
      const formData = new FormData();

      if (values.commonName) {
        formData.append("commonName", values.commonName);
      }

      const location = {
        lat: values.location.lat,
        long: values.location.long,
        address: values.location.address,
        stateId: values.location.state?.value,
        cityId: values.location.city?.value,
      };

      formData.append("location", JSON.stringify(location));

      formData.append("collectedAt", values.collectedAt.toISOString());

      formData.append("scientificName", values.scientificName);
      formData.append("taxonIds", values.taxonomy.value);
      formData.append("description", values.description);

      if (values.characteristics?.length) {
        formData.append(
          "characteristicIds",
          values.characteristics.map((c) => c.value).join(","),
        );
      }

      if (values.images.length > 0) {
        const removedFiles = values.images
          .filter((f) => f.removed && !f.isNew)
          .map((f) => f.id);

        if (removedFiles.length > 0) {
          formData.append("filesToDelete", removedFiles.join(","));
        }

        const newFiles = values.images.filter((f) => f.isNew);

        if (newFiles.length > 0) {
          await appendFiles(
            formData,
            "file",
            newFiles.map((f) => f.url),
          );
        }
      }

      if (data) {
        await putSpeciesMutation.mutateAsync({
          id: data.id,
          formData,
        });

        toast.warning("Espécie atualizada e enviada para aprovação");
        onCloseAddDialog();
        return;
      }

      await postSpeciesMutation.mutateAsync(formData);

      toast.warning("Espécie enviada para aprovação");
      onCloseAddDialog();
    } catch (error) {
      console.error(error);
      toast.error(`Erro ao ${data ? "editar" : "adicionar"} espécie`);
    }
  }

  function onCloseAddDialog() {
    form.resetField("commonName");
    form.resetField("scientificName");
    form.resetField("collectedAt");
    form.resetField("description");
    form.resetField("images");
    form.resetField("characteristics");
    form.resetField("taxonomy");
    form.resetField("location");
    onClose();
  }

  useEffect(() => {
    if (data) {
      form.setValue("commonName", data.commonName);
      form.setValue("scientificName", data.scientificName);
      form.setValue("collectedAt", new Date(data.collectedAt));
      form.setValue("description", data.description ?? "");

      form.setValue(
        "characteristics",
        data.characteristics?.map((c) => ({
          value: String(c.id),
          label: c.name,
        })) ?? [],
      );

      if (data.taxons?.length) {
        form.setValue("taxonomy", {
          label: data?.taxons?.[0]?.name ?? "",
          value: String(data?.taxons?.[0]?.id ?? ""),
        });
      }

      form.setValue("location", {
        address: data.location.address,
        lat: data.location.lat,
        long: data.location.long,
        state: {
          label: data.location.state.code,
          value: String(data.location.state.id),
        },
        city: {
          label: data.location.city.name,
          value: String(data.location.city.id),
        },
      });

      form.setValue(
        "images",
        data.files.map((file) => ({
          id: file.id,
          url: file.url,
          removed: false,
          isNew: false,
        })),
      );
    }
  }, [data, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAddDialog}>
      <DialogContent className="h-screen max-w-[1200px] overflow-auto lg:h-fit lg:min-w-[500px]">
        <DialogHeader>
          <DialogTitle>{dialogActionTitle} Espécie</DialogTitle>
          {!isReadOnly && (
            <DialogDescription>
              Preencha os campos abaixo para {dialogActionTitle.toLowerCase()}{" "}
              uma espécie.
            </DialogDescription>
          )}
        </DialogHeader>
        <Form {...form}>
          <form id="edit-specie-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <GeneralInfoForm isReadOnly={isReadOnly} form={form} />
                  <CharacteristicInfoForm isReadOnly={isReadOnly} form={form} />
                </div>
                <LocationInfoForm isReadOnly={isReadOnly} form={form} />
              </div>
              <FormField
                control={form.control}
                name={"images"}
                render={({ field }) => (
                  <FormItem className="max-w-[750px] overflow-x-auto">
                    <FormLabel>Imagens (*)</FormLabel>
                    <FormControl>
                      <ImageManager
                        existingImages={field.value}
                        isReadOnly={isReadOnly}
                        onImagesChange={(newImages) =>
                          field.onChange(newImages)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {!isReadOnly && (
              <DialogFooter className="gap-2 pt-8">
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
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
