import React from 'react';
import { Accordion } from '~/components/ui/accordion';
import { type GetSpecieApiResponse } from '~/app/museu/herbario/types/specie.types';
import { type ChangeRequestDiff } from '../../../types/change-request-detail.types';
import {
  GeneralInfoSection,
  LocationSection,
  SpecialistsSection,
  FilesSection,
} from './sections';

type SpecieChangeRequestContentProps = {
  data: GetSpecieApiResponse;
  action: 'create' | 'update' | 'delete';
};

/**
 * Displays specie-specific details grouped in accordion sections.
 */
export function SpecieChangeRequestContent({
  data,
  action,
}: SpecieChangeRequestContentProps): React.JSX.Element {
  const diff = (data.diff ?? {}) as ChangeRequestDiff;
  const isUpdate = action === 'update';

  return (
    <Accordion
      type="multiple"
      defaultValue={['general', 'location', 'specialists']}
      className="w-full pt-4"
    >
      <GeneralInfoSection
        scientificName={data.scientificName}
        commonName={data.commonName}
        description={data.description}
        taxons={data.taxons}
        characteristics={data.characteristics}
        diff={diff}
        isUpdate={isUpdate}
      />

      <LocationSection
        location={data.location}
        diff={diff}
        isUpdate={isUpdate}
      />

      <SpecialistsSection
        collector={data.collector}
        determinator={data.determinator}
        collectedAt={data.collectedAt}
        determinatedAt={data.determinatedAt}
        diff={diff}
        isUpdate={isUpdate}
      />

      <FilesSection files={data.files} filesDiff={diff.files} />
    </Accordion>
  );
}
