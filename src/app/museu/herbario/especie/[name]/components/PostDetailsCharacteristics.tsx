import { Button } from '~/components/ui/button';
import { ImageIcon, Leaf } from 'lucide-react';
import { type GetCharacteristicApiResponse } from '../../../types/characteristic.types';
import { type FileTypeApiResponse } from '../../../types/file.types';

type PostDetailsCharacteristicsProps = {
  characteristics: GetCharacteristicApiResponse[];
  onImageClick: (name: string, files: FileTypeApiResponse[]) => void;
};
export function PostDetailsCharacteristics({
  characteristics,
  onImageClick,
}: Readonly<PostDetailsCharacteristicsProps>) {
  if (!characteristics?.length) return null;

  // Group characteristics by type
  const groupedCharacteristics = characteristics.reduce(
    (acc, characteristic) => {
      const typeName = characteristic.type.name;
      acc[typeName] ??= [];
      acc[typeName].push(characteristic);
      return acc;
    },
    {} as Record<string, GetCharacteristicApiResponse[]>,
  );

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center gap-2">
        <Leaf className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">
          Características Botânicas
        </h2>
      </div>
      <div className="space-y-8">
        {Object.entries(groupedCharacteristics).map(([typeName, chars]) => (
          <div key={typeName}>
            <h3 className="mb-4 text-lg font-semibold capitalize text-primary/90">
              {typeName}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {chars.map((c) => (
                <div
                  key={c.id}
                  className="group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex flex-col justify-between p-5">
                    <div className="mb-3">
                      <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1">
                        <span className="text-xs font-medium text-primary">
                          {c.type.name}
                        </span>
                      </div>
                      <p className="text-base font-medium text-foreground">
                        {c.name}
                      </p>
                    </div>
                    <Button
                      variant={c.files?.length ? 'default' : 'outline'}
                      size="sm"
                      className="w-full transition-all duration-200"
                      disabled={!c.files?.length}
                      title={c.files?.length ? 'Ver imagem' : 'Sem imagem'}
                      onClick={() => onImageClick(c.name, c.files ?? [])}
                    >
                      <ImageIcon className="mr-2 h-4 w-4" />
                      {c.files?.length ? 'Ver Imagem' : 'Sem Imagem'}
                    </Button>
                  </div>
                  {/* Decorative gradient overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
