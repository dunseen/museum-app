import { decimalToDMS } from '~/utils/lat-long';
import { type GetSpecieApiResponse } from '../../../types/specie.types';
import { formatDate } from '~/utils/date';

type PostDetailsTechnicalDataProps = {
  specie: GetSpecieApiResponse;
  createdAt: string;
};
export function PostDetailsTechnicalData({
  specie,
  createdAt,
}: Readonly<PostDetailsTechnicalDataProps>) {
  if (!specie) return null;
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
      <li>
        <strong className="text-foreground">Coletor:</strong>{' '}
        {specie.collector.name} — {formatDate(specie.collectedAt)}
      </li>
      <li>
        <strong className="text-foreground">Determinador:</strong>{' '}
        {specie.determinator.name} — {formatDate(specie.determinatedAt)}
      </li>
      <li>
        <strong className="text-foreground">Descrição:</strong>{' '}
        {specie.description}
      </li>
      <li>
        <strong className="text-foreground">Localização:</strong>{' '}
        {specie.location.address} — {specie.location.city.name} /{' '}
        {specie.location.state.code}
      </li>
      <li>
        <strong className="text-foreground">Coordenadas:</strong>{' '}
        {decimalToDMS(specie.location.lat ?? '0', true)} /{' '}
        {decimalToDMS(specie.location.long ?? '0', false)}
      </li>
      <li>
        <p className="mt-12 text-xs text-muted-foreground">
          Publicado em{' '}
          {formatDate(createdAt, {
            hour: '2-digit',
            minute: '2-digit',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
          })}
        </p>
      </li>
    </ul>
  );
}
