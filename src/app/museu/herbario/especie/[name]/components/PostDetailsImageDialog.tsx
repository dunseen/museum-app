import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { ImageCarousel } from './image-carousel';
import { type FileTypeApiResponse } from '../../../types/file.types';

type PostDetailsImageDialogProps = {
  selectedImages: { files: FileTypeApiResponse[]; name: string } | null;
  onClose: () => void;
};

export function PostDetailsImageDialog({
  selectedImages,
  onClose,
}: Readonly<PostDetailsImageDialogProps>) {
  if (!selectedImages?.files?.length) return null;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="capitalize">
            {selectedImages.name}
          </DialogTitle>
        </DialogHeader>
        <ImageCarousel
          specieName={selectedImages.name}
          files={selectedImages?.files ?? []}
        />
      </DialogContent>
    </Dialog>
  );
}
