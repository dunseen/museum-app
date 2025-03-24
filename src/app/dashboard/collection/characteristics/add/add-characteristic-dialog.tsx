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
import { Input } from "~/components/ui/input";

import { z } from "zod";
import { type Nullable } from "~/types";
import { Textarea } from "~/components/ui/textarea";
import ImageManager from "~/app/dashboard/shared/components/image-manager";
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

type AddCharacteristicDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<GetCharacteristicApiResponse>;
};

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
  description: z.string({
    required_error: "Campo obrigatório",
  }),

  images: z
    .array(z.string({ required_error: "Campo obrigatório" }))
    .min(1, "Adicione ao menos uma imagem"),
});

export type CharacteristicFormType = z.infer<typeof formCharacteristicSchema>;
export const AddCharacteristicDialog: React.FC<
  AddCharacteristicDialogProps
> = ({ dialogActionTitle, isOpen, onClose, data }) => {
  const { debouncedInput, onInputChange } = useDebouncedInput();

  const postCharacteristicsMutation = usePostCharacteristics();
  const postCharacteristicTypes = usePostCharacteristicTypes();

  const { data: options = [], isLoading: isLoadingCharacteristicTypes } =
    useGetCharacteristicTypes({
      name: debouncedInput,
    });

  const form = useForm<CharacteristicFormType>({
    resolver: zodResolver(formCharacteristicSchema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
      type: undefined,
    },
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
      formData.append("description", values.description);
      formData.append("name", values.name);

      await appendFiles(formData, "file", values.images);

      await postCharacteristicsMutation.mutateAsync(formData);

      toast.success("Característica adicionada com sucesso");
      onCloseAddDialog();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao adicionar característica");
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
          <DialogTitle>{dialogActionTitle} Característica</DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {dialogActionTitle.toLowerCase()} uma
            característica.
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
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Nome (*)</FormLabel>
                      <FormControl>
                        <Input
                          id={field.name}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
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
                  render={() => (
                    <FormItem className="flex-1">
                      <FormLabel>Coleção (*)</FormLabel>
                      <FormControl>
                        <AsyncSelect
                          name="type"
                          control={form.control}
                          onInputChange={onInputChange}
                          isLoading={isLoadingCharacteristicTypes}
                          options={options.map((opt) => ({
                            label: opt.name,
                            value: String(opt.id),
                          }))}
                          placeholder="Pesquisar / Adicionar coleção ex: Folha"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição (*)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informe uma breve descrição da característica"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        defaultValue={[]}
                        render={({ field }) => (
                          <ImageManager
                            existingImages={field.value}
                            onImagesChange={(files) => {
                              field.onChange(files);
                            }}
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
                disabled={postCharacteristicsMutation.isPending}
              >
                Cancelar
              </Button>
              <Button
                isLoading={postCharacteristicsMutation.isPending}
                disabled={postCharacteristicsMutation.isPending}
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
