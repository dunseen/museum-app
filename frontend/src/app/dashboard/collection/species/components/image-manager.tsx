/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface ImageManagerProps {
  existingImages: string[];
  errorMessage?: string;
  onImagesChange: (images: string[]) => void;
}

export default function ImageManager({
  existingImages = [],
  errorMessage,
  onImagesChange,
}: ImageManagerProps) {
  const [images, setImages] = useState<string[]>(existingImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange(updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto">
      <div className="flex items-center gap-2">
        <p className={`text-md font mb-2 ${errorMessage && "text-red-500"}`}>
          Imagens
        </p>
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
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
          aria-label="Adicionar imagens"
        />
      </div>
      <div className="flex max-w-md gap-2 overflow-x-auto">
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
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
