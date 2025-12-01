import { type useForm } from 'react-hook-form';
import { type TaxonomyFormType } from '../add-taxonomy-dialog';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { AsyncSelect } from '~/components/ui/async-select';
import { type useDebouncedInput } from '~/hooks/use-debounced-input';
import { useGetHierarchies } from '../../api';

type HierarchyFormFieldProps = {
  form: ReturnType<typeof useForm<TaxonomyFormType>>;
  debouncedInputHook: ReturnType<typeof useDebouncedInput>;
  defaultValue?: {
    label: string;
    value: string;
  };
};

export const HierarchyFormField: React.FC<HierarchyFormFieldProps> = ({
  form,
  debouncedInputHook,
  defaultValue,
}) => {
  const { curentPage, pageLimit, debouncedInput, onInputChange } =
    debouncedInputHook;

  const getHierarchies = useGetHierarchies({
    name: debouncedInput,
    limit: pageLimit,
    page: curentPage,
  });

  const taxonomyLevels =
    getHierarchies.data?.map((h) => ({
      value: String(h.id),
      label: h.name,
    })) ?? [];

  return (
    <FormField
      control={form.control}
      name="hierarchy"
      render={() => (
        <FormItem>
          <FormLabel>Hierarquia (*)</FormLabel>
          <FormControl>
            <AsyncSelect
              name="hierarchy"
              isCreatable
              control={form.control}
              onInputChange={onInputChange}
              isLoading={getHierarchies.isLoading}
              options={taxonomyLevels}
              placeholder="Pesquisar / Criar Hierarquia"
              defaultValue={defaultValue}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
