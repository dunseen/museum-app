import { useEffect, useRef, useState } from 'react';
import { type ImageType } from '../components/image-manager';

type ImageManagerProps = {
  existingImages: ImageType[];
  onImagesChange: (images: ImageType[]) => void;
};
export function useImageManager({
  existingImages,
  onImagesChange,
}: ImageManagerProps) {
  const [images, setImages] = useState<ImageType[]>([]);
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
    event.target.value = '';
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

  useEffect(() => {
    if (!images.length) {
      setImages(existingImages);
    }
  }, [existingImages, images]);

  return {
    images,
    handleFileChange,
    handleRemoveImage,
    handleAddImageClick,
    fileInputRef,
  };
}
