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

type AddCharacteristicDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<GetCharacteristicApiResponse>;
};

const formCharacteristicSchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }),
  type: z.string({
    required_error: "Campo obrigatório",
  }),
  description: z.string(),
  images: z.array(z.string()).min(1, "Adicione ao menos uma imagem"),
});

export type CharacteristicFormType = z.infer<typeof formCharacteristicSchema>;
export const AddCharacteristicDialog: React.FC<
  AddCharacteristicDialogProps
> = ({ dialogActionTitle, isOpen, onClose, data }) => {
  const form = useForm<CharacteristicFormType>({
    resolver: zodResolver(formCharacteristicSchema),
    defaultValues: {
      name: data?.name,
    },
  });

  function onSubmit(values: CharacteristicFormType) {
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
                          placeholder="Digite o nome da característica"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Tipo (*)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o tipo da característica ex: Folha"
                          {...field}
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
                    <FormLabel>Descrição (opcional)</FormLabel>
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
