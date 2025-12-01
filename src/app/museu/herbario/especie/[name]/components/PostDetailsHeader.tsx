import { Badge } from '~/components/ui/badge';
import { type GetSpecieApiResponse } from '../../../types/specie.types';

type PostDetailsHeaderProps = {
  specie: GetSpecieApiResponse;
};
export function PostDetailsHeader({
  specie,
}: Readonly<PostDetailsHeaderProps>) {
  const title = specie?.commonName ?? specie?.scientificName;
  const subtitle = specie?.commonName ? specie.scientificName : '-';
  const taxons = specie?.taxons;

  return (
    <>
      <header>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <p className="text-lg italic text-muted-foreground">{subtitle}</p>
      </header>

      <div className="flex flex-wrap gap-4">
        {taxons?.map((t) => (
          <div key={t.name} className="flex flex-col">
            <span className="text-sm capitalize text-muted-foreground">
              {t.hierarchy.name}
            </span>
            <Badge>{t.name}</Badge>
          </div>
        ))}
      </div>
    </>
  );
}
