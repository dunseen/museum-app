import React from 'react';
import { type useForm } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { type SpecieFormType } from '../add-specie-dialog';

type GeneralInfoFormProps = {
  form: ReturnType<typeof useForm<SpecieFormType>>;
  isReadOnly?: boolean;
};
export const GeneralInfoForm: React.FC<GeneralInfoFormProps> = ({
  form,
  isReadOnly,
}) => {
  return (
    <div className="flex flex-col gap-2">
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
                readOnly={isReadOnly}
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
                readOnly={isReadOnly}
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
                readOnly={isReadOnly}
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
