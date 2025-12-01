import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { FieldDiff } from '../../field-diff';
import { formatSpecialist, formatDate } from '../formatters';
import { getOldValueFromDiff } from '../utils';
import { type ChangeRequestDiff } from '../../../../types/change-request-detail.types';

type SpecialistsSectionProps = {
  collector: unknown;
  determinator: unknown;
  collectedAt: string | null;
  determinatedAt: string | null;
  diff: ChangeRequestDiff;
  isUpdate: boolean;
};

export function SpecialistsSection({
  collector,
  determinator,
  collectedAt,
  determinatedAt,
  diff,
  isUpdate,
}: SpecialistsSectionProps): React.JSX.Element {
  return (
    <AccordionItem value="specialists">
      <AccordionTrigger>Especialistas</AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-4">
          <FieldDiff
            label="Coletor"
            oldValue={getOldValueFromDiff(
              diff,
              'collector',
              collector,
              isUpdate,
            )}
            newValue={collector}
            formatValue={formatSpecialist}
          />

          <FieldDiff
            label="Determinador"
            oldValue={getOldValueFromDiff(
              diff,
              'determinator',
              determinator,
              isUpdate,
            )}
            newValue={determinator}
            formatValue={formatSpecialist}
          />

          <FieldDiff
            label="Data de Coleta"
            oldValue={getOldValueFromDiff(
              diff,
              'collectedAt',
              collectedAt,
              isUpdate,
            )}
            newValue={collectedAt}
            formatValue={formatDate}
          />

          <FieldDiff
            label="Data de Determinação"
            oldValue={getOldValueFromDiff(
              diff,
              'determinatedAt',
              determinatedAt,
              isUpdate,
            )}
            newValue={determinatedAt}
            formatValue={formatDate}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
