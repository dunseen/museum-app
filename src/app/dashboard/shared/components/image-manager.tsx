/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { useImageManager } from "../hooks/use-image-manager";

interface ImageManagerProps {
  existingImages: string[];
  onImagesChange: (images: string[]) => void;
}

export default function ImageManager({
  existingImages = [],
  onImagesChange,
}: ImageManagerProps) {
  const {
    fileInputRef,
    handleAddImageClick,
    handleFileChange,
    handleRemoveImage,
    images,
  } = useImageManager({
    existingImages,
    onImagesChange,
  });

  return (
    <div className="mx-auto">
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
      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <Card key={index} className="group relative min-w-32">
            <CardContent className="p-2">
              <img
                src={image}
                alt={`Imagem ${index + 1}`}
                className="h-32 w-full rounded object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                type="button"
                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => handleRemoveImage(index)}
                aria-label={`Remover imagem ${index + 1}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
