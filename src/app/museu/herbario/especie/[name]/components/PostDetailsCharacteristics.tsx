import { Button } from "~/components/ui/button";
import { ImageIcon } from "lucide-react";
import { type GetCharacteristicApiResponse } from "../../../types/characteristic.types";
import { type FileTypeApiResponse } from "../../../types/file.types";

type PostDetailsCharacteristicsProps = {
  characteristics: GetCharacteristicApiResponse[];
  onImageClick: (name: string, files: FileTypeApiResponse[]) => void;
};
export function PostDetailsCharacteristics({
  characteristics,
  onImageClick,
}: Readonly<PostDetailsCharacteristicsProps>) {
  if (!characteristics?.length) return null;

  return (
    <section className="mt-12">
      <h2 className="mb-4 text-2xl font-semibold text-foreground">
        Características
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {characteristics.map((c) => (
          <div
            key={c.id}
            className="flex flex-col justify-between rounded-lg border bg-muted p-4 shadow-sm"
          >
            <div>
              <h3 className="text-lg font-semibold capitalize text-foreground">
                {c.type.name}
              </h3>
              <p className="text-muted-foreground">{c.name}</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="mt-4 self-start"
              disabled={!c.files?.length}
              title={c.files?.length ? "Ver imagem" : "Sem imagem"}
              onClick={() => onImageClick(c.name, c.files ?? [])}
            >
              <ImageIcon />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
