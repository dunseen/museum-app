'use client';

import dynamic from 'next/dynamic';

const LocationMap = dynamic(
  () => import('./location-map').then((mod) => mod.LocationMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted">
        <p className="text-sm text-muted-foreground">Carregando mapa...</p>
      </div>
    ),
  },
);

type LocationMapHandlerProps = {
  lat: number;
  lng: number;
  title: string;
  zoom?: number;
  height?: string;
  className?: string;
};

export function LocationMapHandler({
  lat,
  lng,
  title,
  zoom = 15,
  height = '400px',
  className = '',
}: LocationMapHandlerProps) {
  return (
    <LocationMap
      lat={lat}
      lng={lng}
      title={title}
      zoom={zoom}
      height={height}
      className={className}
    />
  );
}
