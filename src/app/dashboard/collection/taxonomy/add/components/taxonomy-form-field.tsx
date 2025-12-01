import { type useForm } from 'react-hook-form';
import { type TaxonomyFormType } from '../add-taxonomy-dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { type useDebouncedInput } from '~/hooks/use-debounced-input';
import { useGetTaxons } from '../../api';
import Select from 'react-select';

type LocationInfoFormProps = {
  form: ReturnType<typeof useForm<TaxonomyFormType>>;
  debouncedInputHook: ReturnType<typeof useDebouncedInput>;
  defaultValue?: {
    value: string;
    label: string;
  };
};

export const TaxonomyFormField: React.FC<LocationInfoFormProps> = ({
  form,
  debouncedInputHook,
  defaultValue,
}) => {
  const { curentPage, debouncedInput, onInputChange, pageLimit } =
    debouncedInputHook;

  const hierarchyWatch = form.watch('hierarchy');

  const getTaxons = useGetTaxons({
    name: debouncedInput,
    limit: pageLimit,
    page: curentPage,
    hierarchyId: hierarchyWatch?.__isNew__ ? undefined : hierarchyWatch?.value,
  });

  const options =
    getTaxons.data?.data?.map((h) => ({
      value: String(h.id),
      label: h.name,
    })) ?? [];

  return (
    <FormField
      control={form.control}
      name="parent"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Taxonomia Pai (opcional)</FormLabel>
          <FormControl>
            <Select
              name="parent"
              onInputChange={onInputChange}
              options={options}
              placeholder="Pesquisar taxonomia pai"
              noOptionsMessage={() => 'Nenhum dado encontrado'}
              id={field.name}
              onBlur={field.onBlur}
              onChange={field.onChange}
              defaultValue={defaultValue}
              isDisabled={field.disabled ?? !hierarchyWatch}
              loadingMessage={() => 'Carregando...'}
              isLoading={getTaxons.isLoading || getTaxons.isFetching}
              ref={field.ref}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
