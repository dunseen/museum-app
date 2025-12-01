import React from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { FieldDiff } from '../../field-diff';
import {
  formatState,
  formatCity,
  formatLatitude,
  formatLongitude,
} from '../formatters';
import { getOldValueFromDiff } from '../utils';
import { type ChangeRequestDiff } from '../../../../types/change-request-detail.types';

type LocationSectionProps = {
  location: {
    state: unknown;
    city: unknown;
    address: string | null;
    lat: string | null;
    long: string | null;
  };
  diff: ChangeRequestDiff;
  isUpdate: boolean;
};

export function LocationSection({
  location,
  diff,
  isUpdate,
}: LocationSectionProps): React.JSX.Element {
  return (
    <AccordionItem value="location">
      <AccordionTrigger>Localização</AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-2 gap-4">
          <FieldDiff
            label="Estado"
            oldValue={getOldValueFromDiff(
              diff,
              'state',
              location.state,
              isUpdate,
            )}
            newValue={location.state}
            formatValue={formatState}
          />

          <FieldDiff
            label="Cidade"
            oldValue={getOldValueFromDiff(
              diff,
              'city',
              location.city,
              isUpdate,
            )}
            newValue={location.city}
            formatValue={formatCity}
          />

          <FieldDiff
            label="Endereço"
            oldValue={getOldValueFromDiff(
              diff,
              'collectLocation',
              location.address,
              isUpdate,
            )}
            newValue={location.address}
          />

          <FieldDiff
            label="Latitude"
            oldValue={getOldValueFromDiff(
              diff,
              'geoLocation',
              location.lat,
              isUpdate,
            )}
            newValue={location.lat}
            formatValue={formatLatitude}
          />

          <FieldDiff
            label="Longitude"
            oldValue={getOldValueFromDiff(
              diff,
              'geoLocation',
              location.long,
              isUpdate,
            )}
            newValue={location.long}
            formatValue={formatLongitude}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
