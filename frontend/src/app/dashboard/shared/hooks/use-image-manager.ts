import { useRef, useState } from "react";

type ImageManagerProps = {
  existingImages: string[];
  onImagesChange: (images: string[]) => void;
};
export function useImageManager({
  existingImages,
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

  return {
    images,
    handleFileChange,
    handleRemoveImage,
    handleAddImageClick,
    fileInputRef,
  };
}
