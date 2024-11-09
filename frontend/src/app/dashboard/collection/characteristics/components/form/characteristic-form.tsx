"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
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
import {
  formCharacteristicSchema,
  type CharacteristicFormType,
} from "./schema";
import { Textarea } from "~/components/ui/textarea";
import { Input } from "~/components/ui/input";
type CharacteristicFormProps = {
  data?: CharacteristicFormType;
  title: string;
};
export const CharacteristicForm: React.FC<CharacteristicFormProps> = ({
  data,
  title,
}) => {
  const router = useRouter();
  const form = useForm<CharacteristicFormType>({
    resolver: zodResolver(formCharacteristicSchema),
    defaultValues: data,
  });

  function onSubmit(values: CharacteristicFormType) {
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
          <h1 className="text-xl font-bold">{title} Característica</h1>
        </div>

        <Button form="edit-specie-form" type="submit" title="Salvar">
          Salvar
        </Button>
      </header>
      <Form {...form}>
        <form id="edit-specie-form" onSubmit={form.handleSubmit(onSubmit)}>
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
                        placeholder="Digite o tipo da característica"
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
