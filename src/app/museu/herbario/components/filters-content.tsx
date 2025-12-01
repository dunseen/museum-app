/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef, useState } from 'react';
import Select, { type ActionMeta, type MultiValue } from 'react-select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from '~/components/ui/sheet';
import { useIsMobile } from '~/hooks/use-mobile';
import {
  useGetCharacteristics,
  useGetCharacteristicTypes,
  useGetHierarchies,
} from '../api';
import { usePost } from '../context/post-context';

type FiltersContentProps = {
  onCloseFilters: (clearInnerFilters?: () => void) => void;
};

type SelectOption = {
  label: string;
  value: number;
};

interface GroupedOption {
  label: string;
  options: SelectOption[];
}

export function FiltersContent({ onCloseFilters }: FiltersContentProps) {
  const [selectedCharacteristicType, setSelectedCharacteristicType] = useState<
    SelectOption[]
  >([]);
  const selectedCharacteristicsRef = useRef<any>(null);
  const [accordionValue, setAccordionValue] = useState<string>('');
  const isMobile = useIsMobile();

  const { handleSearch, handleCharacteristicFilter, handleClearAllFilters } =
    usePost();

  const {
    data: characteristicTypes,
    isSuccess: hasCharacteristicTypes,
    isLoading: isLoadingCharacteristicTypes,
  } = useGetCharacteristicTypes();

  const { data: characteristics, isLoading: isLoadingCharacteristics } =
    useGetCharacteristics(hasCharacteristicTypes, {
      typeIds: selectedCharacteristicType.map((ct) => ct.value),
    });

  const { data: hierarchies } = useGetHierarchies();

  const onAccordionChange = (value: string) => {
    setAccordionValue((prev) => (prev === value ? '' : value));
  };

  const handleSearchByTaxon = (id: number, field: string, value: string) => {
    switch (field) {
      case 'família':
        handleSearch({
          familyName: value,
          familyHierarchyId: value ? id : undefined,
        });
        break;
      case 'gênero':
        handleSearch({
          genusName: value,
          genusHierarchyId: value ? id : undefined,
        });
        break;
      case 'ordem':
        handleSearch({
          orderName: value,
          orderHierarchyId: value ? id : undefined,
        });
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setSelectedCharacteristicType([]);
    handleClearAllFilters();
    setAccordionValue('');
    onCloseFilters();
  };

  const characteristicOptions = useMemo(
    () =>
      characteristics?.data.reduce(
        (groups: GroupedOption[], characteristic) => {
          const group = groups.find(
            (g) => g.label === characteristic.type.name,
          );
          if (group) {
            group.options.push({
              value: characteristic.id,
              label: characteristic.name,
            });
          } else {
            groups.push({
              label: characteristic.type.name,
              options: [
                {
                  value: characteristic.id,
                  label: characteristic.name,
                },
              ],
            });
          }
          return groups;
        },
        [],
      ),
    [characteristics?.data],
  );

  const handleCharacteristicTypeInputChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => {
    if (actionMeta.action === 'clear') {
      setSelectedCharacteristicType([]);
      handleCharacteristicFilter([]);
      selectedCharacteristicsRef.current?.clearValue();
      return;
    }

    setSelectedCharacteristicType([...newValue]);
  };

  const handleCharacteristicInputChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => {
    if (actionMeta.action === 'clear') {
      handleCharacteristicFilter([]);
      return;
    }

    handleCharacteristicFilter(newValue.map((v) => String(v.value)));
  };

  return (
    <SheetContent
      side={isMobile ? 'bottom' : 'right'}
      className="h-full max-w-full md:max-w-sm"
    >
      <SheetTitle>Filtros</SheetTitle>
      <SheetDescription>
        Os resultados serão atualizados automaticamente ao aplicar os filtros.
      </SheetDescription>
      <Accordion
        value={accordionValue}
        onValueChange={onAccordionChange}
        type="single"
        collapsible
        className="mt-4 w-full"
      >
        <AccordionItem value="taxonomy">
          <AccordionTrigger>Taxonomia</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 gap-4">
              {hierarchies?.map((hierarchy) => (
                <div key={hierarchy.id}>
                  <Label className="capitalize">{hierarchy.name}</Label>
                  <Input
                    placeholder="Pesquisar..."
                    onChange={(e) =>
                      handleSearchByTaxon(
                        hierarchy.id,
                        hierarchy.name,
                        e.target.value,
                      )
                    }
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="characteristics">
          <AccordionTrigger>Características</AccordionTrigger>
          <AccordionContent>
            <ul className="grid grid-cols-1 gap-4 overflow-y-auto pb-4 md:max-h-[456px]">
              <p>
                Selecione o grupo de característica e em seguida selecione as
                opções desejadas.
              </p>

              <li className="flex-1">
                <Label className="capitalize">Grupo</Label>
                <Select
                  value={selectedCharacteristicType}
                  isMulti
                  isSearchable
                  isClearable
                  isLoading={isLoadingCharacteristicTypes}
                  options={characteristicTypes?.data?.map((c) => ({
                    label: c.name,
                    value: c.id,
                  }))}
                  className="mt-2"
                  classNamePrefix="react-select"
                  placeholder="Selecione o grupo"
                  menuPosition="fixed"
                  menuPlacement="bottom"
                  noOptionsMessage={() => 'Nenhum resultado encontrado'}
                  loadingMessage={() => 'Carregando...'}
                  onChange={handleCharacteristicTypeInputChange}
                />
              </li>
              <li className="flex-1">
                <Label className="capitalize">Características</Label>
                <Select
                  ref={selectedCharacteristicsRef}
                  isMulti
                  isSearchable
                  isClearable
                  isLoading={isLoadingCharacteristics}
                  isDisabled={!selectedCharacteristicType.length}
                  options={characteristicOptions}
                  menuPlacement="bottom"
                  formatGroupLabel={(group) => (
                    <div>
                      <strong>{group.label}</strong>
                      <span className="ml-2 text-xs text-gray-500">
                        ({group.options.length})
                      </span>
                    </div>
                  )}
                  className="mt-2"
                  classNamePrefix="react-select"
                  placeholder="Selecione as características"
                  menuPosition="fixed"
                  onChange={handleCharacteristicInputChange}
                />
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <SheetFooter className="absolute bottom-0 left-0 right-0 p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleClearFilters}
        >
          Limpar Filtros
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}
