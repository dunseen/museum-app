import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { type useForm } from "react-hook-form";
import { type SpecieFormType } from "../add-specie-dialog";
import Select from "react-select";
import { useGetCities, useGetStates } from "../../api";
import { DatePicker } from "~/components/ui/date-picker";

type LocationInfoFormProps = {
  form: ReturnType<typeof useForm<SpecieFormType>>;
};

export const LocationInfoForm: React.FC<LocationInfoFormProps> = ({ form }) => {
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
                  isDisabled={field.disabled ?? stateLoading}
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
                  isDisabled={field.disabled ?? !stateWatch}
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
                <Input
                  defaultValue={field.value}
                  placeholder="ex: -23.5505"
                  ref={field.ref}
                  name={field.name}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
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
                <Input
                  defaultValue={field.value}
                  ref={field.ref}
                  name={field.name}
                  placeholder="ex: -46.6333"
                  onChange={field.onChange}
                  onBlur={field.onBlur}
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
                  onBlur={field.onBlur}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Collection Date */}
        <FormField
          control={form.control}
          name="collectedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data da Coleta (*)</FormLabel>
              <FormControl>
                <DatePicker onChange={field.onChange} value={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
