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
import { usePostSpecies } from "../api";
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
  showDescription?: boolean;
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
  },
  {
    required_error: "Campo obrigatório",
  },
);

const formSpecieSchema = z.object({
  commonName: z.string().optional(),
  collectedAt: z.date({
    required_error: "Campo obrigatório",
  }),
  location: z.object({
    // validate format latitude
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
  images: z.array(imageSchema).nonempty("Campo obrigatório"),
  taxonomyId: z.array(selectSchema).nonempty("Campo obrigatório"),
  characteristics: z.array(selectSchema).optional(),
});

export type SpecieFormType = z.infer<typeof formSpecieSchema>;
export const AddSpecieDialog: React.FC<AddSpecieDialogProps> = ({
  dialogActionTitle,
  isOpen,
  onClose,
  data,
  showDescription,
}) => {
  const postSpeciesMutation = usePostSpecies();

  const form = useForm<SpecieFormType>({
    resolver: zodResolver(formSpecieSchema),
    defaultValues: {
      commonName: data?.commonName,
      scientificName: data?.scientificName,
      collectedAt: data?.collectedAt ?? undefined,
      description: data?.description ?? undefined,
      images:
        data?.files?.map((file) => ({
          id: file.id,
          url: file.url,
        })) ?? [],
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
      formData.append(
        "taxonIds",
        values.taxonomyId.map((t) => t.value).join(","),
      );
      formData.append("description", values.description);

      if (values.characteristics?.length) {
        formData.append(
          "characteristicIds",
          values.characteristics.map((c) => c.value).join(","),
        );
      }

      await appendFiles(
        formData,
        "file",
        values.images.map((f) => f.url),
      );

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
      <DialogContent className="h-screen max-w-full overflow-auto lg:min-w-[500px]">
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
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                  <GeneralInfoForm form={form} />
                  <CharacteristicInfoForm form={form} />
                </div>
                <LocationInfoForm form={form} />
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
