import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { FieldDiff } from '../../field-diff';
import { formatTaxonomy, formatCharacteristics } from '../formatters';
import { getOldValueFromDiff } from '../utils';
import { type ChangeRequestDiff } from '../../../../types/change-request-detail.types';

type GeneralInfoSectionProps = {
  scientificName: string;
  commonName: string | null;
  description: string | null;
  taxons: unknown;
  characteristics: unknown;
  diff: ChangeRequestDiff;
  isUpdate: boolean;
};

export function GeneralInfoSection({
  scientificName,
  commonName,
  description,
  taxons,
  characteristics,
  diff,
  isUpdate,
}: GeneralInfoSectionProps): React.JSX.Element {
  return (
    <AccordionItem value="general">
      <AccordionTrigger>Informações Gerais</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <FieldDiff
            label="Nome Científico"
            oldValue={getOldValueFromDiff(
              diff,
              'scientificName',
              scientificName,
              isUpdate,
            )}
            newValue={scientificName}
          />

          <FieldDiff
            label="Nome Popular"
            oldValue={getOldValueFromDiff(
              diff,
              'commonName',
              commonName,
              isUpdate,
            )}
            newValue={commonName}
          />

          <FieldDiff
            label="Descrição"
            oldValue={getOldValueFromDiff(
              diff,
              'description',
              description,
              isUpdate,
            )}
            newValue={description}
          />

          <FieldDiff
            label="Taxonomia"
            oldValue={getOldValueFromDiff(diff, 'taxons', taxons, isUpdate)}
            newValue={taxons}
            formatValue={formatTaxonomy}
          />

          <FieldDiff
            label="Características"
            oldValue={getOldValueFromDiff(
              diff,
              'characteristics',
              characteristics,
              isUpdate,
            )}
            newValue={characteristics}
            formatValue={formatCharacteristics}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
