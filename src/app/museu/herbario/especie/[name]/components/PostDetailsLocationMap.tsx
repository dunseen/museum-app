import { MapPin } from 'lucide-react';
import { LocationMapHandler } from '~/components/map';
import { type GetSpecieApiResponse } from '../../../types/specie.types';

type PostDetailsLocationMapProps = {
  specie: GetSpecieApiResponse;
};

export function PostDetailsLocationMap({
  specie,
}: Readonly<PostDetailsLocationMapProps>) {
  if (
    !specie?.location?.lat ||
    !specie?.location?.long ||
    specie.location.lat === '0' ||
    specie.location.long === '0'
  ) {
    return null;
  }

  const lat = parseFloat(specie.location.lat);
  const lng = parseFloat(specie.location.long);

  if (isNaN(lat) || isNaN(lng)) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">
          Local de Coleta
        </h2>
      </div>
      <div className="overflow-hidden rounded-lg border bg-card shadow-md">
        <LocationMapHandler
          lat={lat}
          lng={lng}
          title={`${specie.scientificName} - ${specie.location.city.name}, ${specie.location.state.code}`}
          zoom={13}
          height="450px"
        />
        <div className="border-t bg-muted/50 p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Endereço:</strong>{' '}
            {specie.location.address}
          </p>
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Cidade:</strong>{' '}
            {specie.location.city.name} / {specie.location.state.code}
          </p>
        </div>
      </div>
    </section>
  );
}
