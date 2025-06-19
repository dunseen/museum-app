import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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

import { z } from "zod";
import { type Nullable } from "~/types";
import ImageManager, {
  type ImageType,
} from "~/app/dashboard/shared/components/image-manager";
import { Button } from "~/components/ui/button";
import { type GetCharacteristicApiResponse } from "~/app/museu/herbario/types/characteristic.types";
import {
  useGetCharacteristicTypes,
  usePostCharacteristics,
  usePostCharacteristicTypes,
} from "../api";
import { toast } from "sonner";
import { AsyncSelect } from "~/components/ui/async-select";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import { appendFiles } from "~/utils/files";
import { usePutCharacteristics } from "../api/usePutCharacteristics";

type AddCharacteristicDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<GetCharacteristicApiResponse>;
};

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

const formCharacteristicSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }),
  type: z.object(
    {
      value: z.string({ required_error: "Campo obrigatório" }),
      label: z.string({ required_error: "Campo obrigatório" }),
      __isNew__: z.boolean().optional(),
    },
    {
      required_error: "Campo obrigatório",
      invalid_type_error: "Campo obrigatório",
    },
  ),
  images: z
    .array(imageSchema, {
      required_error: "Campo obrigatório",
    })
    .min(1, "Adicione ao menos uma imagem"),
});

export type CharacteristicFormType = z.infer<typeof formCharacteristicSchema>;
export const AddCharacteristicDialog: React.FC<
  AddCharacteristicDialogProps
> = ({ dialogActionTitle, isOpen, onClose, data }) => {
  const { debouncedInput, onInputChange } = useDebouncedInput();

  const postCharacteristicsMutation = usePostCharacteristics();
  const putCharacteristicsMutation = usePutCharacteristics();
  const postCharacteristicTypes = usePostCharacteristicTypes();

  const { data: options = [], isLoading: isLoadingCharacteristicTypes } =
    useGetCharacteristicTypes({
      name: debouncedInput,
    });

  const defaultType = data?.type
    ? { label: data?.type?.name, value: String(data?.type?.id) }
    : undefined;

  const defaultImages: ImageType[] | undefined = data?.files.map((file) => ({
    id: file.id,
    url: file.url,
    removed: false,
    isNew: false,
  }));

  const form = useForm<CharacteristicFormType>({
    resolver: zodResolver(formCharacteristicSchema),
  });

  async function onSubmit(values: CharacteristicFormType) {
    try {
      const formData = new FormData();
      let typeId: number | undefined = undefined;

      typeId = Number(values.type?.value);

      if (values.type.__isNew__) {
        const type = await postCharacteristicTypes.mutateAsync({
          name: values.type.value,
        });

        typeId = type?.id;
      }

      formData.append("typeId", typeId.toString() || "");
      formData.append("name", values.name);

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
        await putCharacteristicsMutation.mutateAsync({
          id: data.id,
          formData,
        });

        toast.success("Característica editada com sucesso");
        onCloseAddDialog();
        return;
      }

      await postCharacteristicsMutation.mutateAsync(formData);
      toast.success("Característica adicionada com sucesso");
      onCloseAddDialog();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar característica");
    }
  }

  function onCloseAddDialog() {
    form.resetField("type");
    form.resetField("name");
    form.resetField("images");

    onClose();
  }

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("type", {
        label: data.type?.name,
        value: String(data.type?.id),
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
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{dialogActionTitle} Parametros</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {dialogActionTitle.toLowerCase()} um
            parametro.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="add-characteristic-form"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue={data?.name}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Nome (*)</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          defaultValue={field.value}
                          ref={field.ref}
                          placeholder="Digite o nome da característica"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  defaultValue={defaultType}
                  render={() => (
                    <FormItem className="flex-1">
                      <FormLabel>Característica (*)</FormLabel>
                      <FormControl>
                        <AsyncSelect
                          name="type"
                          control={form.control}
                          onInputChange={onInputChange}
                          isLoading={isLoadingCharacteristicTypes}
                          defaultValue={defaultType}
                          options={options.map((opt) => ({
                            label: opt.name,
                            value: String(opt.id),
                          }))}
                          placeholder="Pesquisar / Adicionar característica"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={"images"}
                defaultValue={defaultImages}
                render={({ field }) => (
                  <FormItem className="max-w-full overflow-x-auto">
                    <FormLabel>Imagens (*)</FormLabel>
                    <FormControl>
                      <ImageManager
                        existingImages={defaultImages}
                        onImagesChange={(files) => {
                          field.onChange(files);
                        }}
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
                disabled={
                  postCharacteristicsMutation.isPending ||
                  putCharacteristicsMutation.isPending
                }
              >
                Cancelar
              </Button>
              <Button
                isLoading={
                  postCharacteristicsMutation.isPending ||
                  putCharacteristicsMutation.isPending
                }
                disabled={
                  postCharacteristicsMutation.isPending ||
                  putCharacteristicsMutation.isPending
                }
                type="submit"
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
