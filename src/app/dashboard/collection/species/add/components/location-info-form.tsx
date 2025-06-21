import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { DMSInput } from "~/components/ui/dms-input";
import { type useForm } from "react-hook-form";
import { type SpecieFormType } from "../add-specie-dialog";
import Select from "react-select";
import { useGetCities, useGetStates } from "../../api";

type LocationInfoFormProps = {
  form: ReturnType<typeof useForm<SpecieFormType>>;
  isReadOnly?: boolean;
};

export const LocationInfoForm: React.FC<LocationInfoFormProps> = ({
  form,
  isReadOnly,
}) => {
  const stateWatch = form.watch("location.state");

  const { data: cityDataOptions, isLoading: cityLoading } = useGetCities({
    stateId: Number(stateWatch?.value),
  });

  const { data: stateDataOptions, isLoading: stateLoading } = useGetStates();

  const cityOptions =
    cityDataOptions?.map((c) => ({
      value: String(c.id),
      label: c.name,
    })) ?? [];

  const stateOptions =
    stateDataOptions?.map((c) => ({
      value: String(c.id),
      label: c.name,
    })) ?? [];

  return (
    <div className="flx-1 flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Localização</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* State */}
        <FormField
          control={form.control}
          name="location.state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado (*)</FormLabel>
              <FormControl>
                <Select
                  name="location.state"
                  placeholder="Pesquisar Estado"
                  noOptionsMessage={() => "Nenhum estado encontrado"}
                  options={stateOptions}
                  id={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  defaultValue={field.value}
                  isDisabled={field.disabled ?? (stateLoading || isReadOnly)}
                  loadingMessage={() => "Carregando..."}
                  isLoading={stateLoading}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City */}
        <FormField
          control={form.control}
          name="location.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade (*)</FormLabel>
              <FormControl>
                <Select
                  name="location.city"
                  placeholder="Pesquisar Cidade"
                  noOptionsMessage={() => "Nenhuma cidade encontrada"}
                  isLoading={cityLoading}
                  options={cityOptions}
                  id={field.name}
                  onBlur={field.onBlur}
                  onChange={field.onChange}
                  defaultValue={field.value}
                  isDisabled={field.disabled ?? (!stateWatch || isReadOnly)}
                  loadingMessage={() => "Carregando cidades..."}
                  ref={field.ref}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Latitude */}
        <FormField
          control={form.control}
          name="location.lat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude (*)</FormLabel>
              <FormControl>
                <DMSInput
                  isLat
                  defaultValue={field.value}
                  placeholder={'ex: 23°32\'00"S'}
                  ref={field.ref}
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  readOnly={isReadOnly}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Longitude */}
        <FormField
          control={form.control}
          name="location.long"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude (*)</FormLabel>
              <FormControl>
                <DMSInput
                  isLat={false}
                  defaultValue={field.value}
                  ref={field.ref}
                  name={field.name}
                  placeholder={'ex: 046°38\'00"W'}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  readOnly={isReadOnly}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location.address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local da coleta (*)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Digite o local da coleta"
                  defaultValue={field.value}
                  ref={field.ref}
                  name={field.name}
                  onChange={field.onChange}
                  readOnly={isReadOnly}
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
