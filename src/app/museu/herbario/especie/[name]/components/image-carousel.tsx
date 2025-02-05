import Image from "next/image";
import React from "react";
import { type FileTypeApiResponse } from "../../../types/file.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

type ImageCarouselProps = {
  files?: FileTypeApiResponse[];
  specieName: string;
};
export const ImageCarousel: React.FC<Readonly<ImageCarouselProps>> = ({
  files,
  specieName,
}) => {
  return (
    <Carousel>
      <CarouselContent>
        {files?.map((file) => (
          <CarouselItem key={file.id}>
            <Image
              src={file.path}
              alt={`${specieName}-image-${file.id}`}
              width={600}
              height={400}
              className="h-[400px] w-full rounded-lg object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
