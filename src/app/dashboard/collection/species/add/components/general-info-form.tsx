import React from "react";
import { type useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { type SpecieFormType } from "../add-specie-dialog";

type GeneralInfoFormProps = {
  form: ReturnType<typeof useForm<SpecieFormType>>;
};
export const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({ form }) => {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <FormField
        control={form.control}
        name="scientificName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Cientifico (*)</FormLabel>
            <FormControl>
              <Input
                defaultValue={field.value}
                ref={field.ref}
                name={field.name}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={field.disabled}
                placeholder="Digite o nome cientifico"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="commonName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome popular (opcional)</FormLabel>
            <FormControl>
              <Input
                defaultValue={field.value ?? undefined}
                ref={field.ref}
                name={field.name}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={field.disabled}
                placeholder="Digite o nome popular"
              />
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
            <FormLabel>Descrição (*)</FormLabel>
            <FormControl>
              <Textarea
                defaultValue={field.value}
                ref={field.ref}
                name={field.name}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={field.disabled}
                placeholder="Informe uma breve descrição da espécie"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
