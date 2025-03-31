import { useRef, useState } from "react";
import { type ImageType } from "../components/image-manager";

type ImageManagerProps = {
  existingImages: ImageType[];
  onImagesChange: (images: ImageType[]) => void;
};
export function useImageManager({
  existingImages,
  onImagesChange,
}: ImageManagerProps) {
  const [images, setImages] = useState<ImageType[]>(existingImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        id: file.lastModified.toString(),
        url: URL.createObjectURL(file),
        isNew: true,
      }));

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange(updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.map((image, i) => {
      if (i === index) {
        return { ...image, removed: true };
      }
      return image;
    });
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
