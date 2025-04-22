import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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

import { z } from "zod";
import { type Nullable } from "~/types";
import { type GetTaxonsApiResponse } from "~/app/museu/herbario/types/taxonomy.types";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import { type PostTaxonsPayload, usePostTaxons, usePutTaxons } from "../api";
import { toast } from "sonner";
import { HierarchyFormField } from "./components/hierarchy-form-field";
import { TaxonomyFormField } from "./components/taxonomy-form-field";
import { CharacteristicFormField } from "./components/characteristic-form-field";

type AddTaxonomyDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  dialogActionTitle: string;
  data?: Nullable<GetTaxonsApiResponse>;
};

const formTaxonomySchema = z.object({
  name: z.string({ required_error: "Campo obrigatório" }),
  hierarchy: z.object(
    { value: z.string(), label: z.string(), __isNew__: z.boolean().optional() },
    {
      required_error: "Campo obrigatório",
      invalid_type_error: "Campo obrigatório",
    },
  ),
  parent: z
    .object({
      value: z.string(),
      label: z.string(),
      __isNew__: z.boolean().optional(),
    })
    .optional(),
  characteristics: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
        __isNew__: z.boolean().optional(),
      }),
    )
    .optional(),
});

export type TaxonomyFormType = z.infer<typeof formTaxonomySchema>;
export const AddTaxonomyDialog: React.FC<AddTaxonomyDialogProps> = ({
  dialogActionTitle,
  isOpen,
  onClose,
  data,
}) => {
  const hierarchyHook = useDebouncedInput();
  const characteristicsHook = useDebouncedInput();
  const taxonomyHook = useDebouncedInput();

  const postTaxonomy = usePostTaxons();
  const putTaxonomy = usePutTaxons();

  const form = useForm<TaxonomyFormType>({
    resolver: zodResolver(formTaxonomySchema),
    defaultValues: {
      name: data?.name,
      hierarchy: data?.hierarchy?.id
        ? {
            value: String(data?.hierarchy.id),
            label: data?.hierarchy.name,
          }
        : undefined,
      characteristics: data?.characteristics?.map((c) => ({
        label: c.name,
        value: String(c.id),
      })),
      parent: data?.parent?.id
        ? {
            value: String(data?.parent?.id),
            label: data?.parent?.name,
          }
        : undefined,
    },
  });

  function onSubmit(values: TaxonomyFormType) {
    const payload: PostTaxonsPayload = {
      hierarchyId: Number(values.hierarchy.value),
      name: values.name,
      parentId: values?.parent?.value ? Number(values.parent.value) : undefined,
      characteristicIds:
        values.characteristics?.map((c) => Number(c.value)) ?? [],
    };

    if (data) {
      putTaxonomy.mutate(
        {
          id: data.id,
          ...payload,
        },
        {
          onSuccess: () => {
            onCloseAddDialog();
            toast.success("Taxonomia atualizada com sucesso");
          },
          onError: () => {
            toast.error("Erro ao atualizar taxonomia");
          },
        },
      );

      return;
    }

    postTaxonomy.mutate(payload, {
      onSuccess: () => {
        onCloseAddDialog();
        toast.success("Taxonomia criada com sucesso");
      },
      onError: () => {
        toast.error("Erro ao criar taxonomia");
      },
    });
  }

  function onCloseAddDialog() {
    form.resetField("name");
    form.resetField("hierarchy");
    form.resetField("characteristics");
    form.resetField("parent");

    onClose();
  }

  useEffect(() => {
    if (data) {
      form.setValue("name", data.name);
      form.setValue("hierarchy", {
        value: String(data.hierarchy.id),
        label: data.hierarchy.name,
      });

      if (data?.characteristics?.length) {
        form.setValue(
          "characteristics",
          data.characteristics.map((c) => ({
            label: c.name,
            value: String(c.id),
          })),
        );
      }

      if (data.parent) {
        form.setValue("parent", {
          value: String(data.parent.id),
          label: data.parent.name,
        });
      }
    }
  }, [data, form]);

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAddDialog}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {dialogActionTitle} Características Taxonômicas
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para {dialogActionTitle.toLowerCase()} uma
            característica taxonômica.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id="edit-specie-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              <div className="flex flex-1 flex-col gap-4">
                <HierarchyFormField
                  form={form}
                  debouncedInputHook={hierarchyHook}
                  defaultValue={
                    data?.hierarchy?.name
                      ? {
                          label: data?.hierarchy.name,
                          value: String(data?.hierarchy?.id),
                        }
                      : undefined
                  }
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome (*)</FormLabel>
                      <FormControl>
                        <Input
                          ref={field.ref}
                          id={field.name}
                          defaultValue={data?.name}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          disabled={field.disabled}
                          placeholder="Digite o nome"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <TaxonomyFormField
                  form={form}
                  debouncedInputHook={taxonomyHook}
                  defaultValue={
                    data?.parent?.name
                      ? {
                          label: data?.parent.name,
                          value: String(data?.parent?.id),
                        }
                      : undefined
                  }
                />
                <CharacteristicFormField
                  form={form}
                  debouncedInputHook={characteristicsHook}
                  defaultValue={
                    data?.characteristics?.map((c) => ({
                      label: c.name,
                      value: String(c.id),
                    })) ?? []
                  }
                />
              </div>
            </div>

            <DialogFooter className="pt-8">
              <Button
                variant={"secondary"}
                type="button"
                onClick={onCloseAddDialog}
                disabled={postTaxonomy.isPending || putTaxonomy.isPending}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isLoading={postTaxonomy.isPending || putTaxonomy.isPending}
                disabled={postTaxonomy.isPending || putTaxonomy.isPending}
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
