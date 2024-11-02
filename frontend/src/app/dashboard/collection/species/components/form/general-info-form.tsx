import React from "react";
import { Controller, type useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import ImageManager from "../image-manager";
import { type SpecieFormType } from "./schema";
import { Textarea } from "~/components/ui/textarea";

type GeneralInfoFormProps = {
  form: ReturnType<typeof useForm<SpecieFormType>>;
  images?: string[];
};
export const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({
  form,
  images,
}) => {
  return (
    <>
      <FormField
        control={form.control}
        name="commonName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome popular (*)</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome popular" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="scientificName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Cientifico (*)</FormLabel>
            <FormControl>
              <Input placeholder="Digite o nome cientifico" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição (opcional)</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Informe uma breve descrição da espécie"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Controller
        name="images"
        control={form.control}
        defaultValue={images}
        render={({ field, fieldState }) => (
          <ImageManager
            errorMessage={fieldState.error?.message}
            existingImages={field.value}
            onImagesChange={(newImages) => field.onChange(newImages)}
          />
        )}
      />
    </>
  );
};
