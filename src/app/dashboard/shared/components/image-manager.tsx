/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { useImageManager } from "../hooks/use-image-manager";
import Image from "next/image";
import { useMemo } from "react";

export type ImageType = {
  id: string;
  url: string;
  removed?: boolean;
  isNew?: boolean;
};
interface ImageManagerProps {
  existingImages?: ImageType[];
  onImagesChange: (images: ImageType[]) => void;

  isReadOnly?: boolean;
}

export default function ImageManager({
  existingImages,
  onImagesChange,
  isReadOnly,
}: ImageManagerProps) {
  const memoizedExistingImages = useMemo(
    () => existingImages ?? [],
    [existingImages],
  );

  const {
    fileInputRef,
    handleAddImageClick,
    handleFileChange,
    handleRemoveImage,
    images,
  } = useImageManager({
    existingImages: memoizedExistingImages,
    onImagesChange,
  });

  return (
    <div className="mx-auto w-full">
      {!isReadOnly && (
        <div className="flex items-center gap-2">
          <Button
            size={"icon"}
            type="button"
            onClick={handleAddImageClick}
            title="Adicionar imagens"
          >
            <Plus />
          </Button>
        </div>
      )}
      <div className="mb-4">
        <input
          type="file"
          accept=".png,.jpeg,.jpg"
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          aria-label="Adicionar imagens"
        />
      </div>
      <div className="flex w-full gap-2 overflow-x-auto">
        {images
          .filter((image) => !image?.removed)
          .map((image, index) => (
            <Card key={index} className="relative min-w-32 flex-shrink-0">
              <CardContent className="p-2">
                <div className="relative h-32 w-full">
                  <Image
                    src={image.url}
                    alt={`Imagem ${index + 1}`}
                    className="h-32 w-full rounded object-cover"
                    fill
                    sizes="100%"
                  />
                </div>

                {!isReadOnly && (
                  <Button
                    variant="destructive"
                    size="icon"
                    type="button"
                    className="absolute right-2 top-2"
                    onClick={() => handleRemoveImage(index)}
                    aria-label={`Remover imagem ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
