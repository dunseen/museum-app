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
    <Carousel className="relative">
      <CarouselContent>
        {files?.map((file, index) => (
          <CarouselItem
            key={file.id}
            className="flex items-center justify-center"
          >
            <div className="flex flex-col items-center gap-2">
              <Image
                src={file.url}
                alt={`${specieName}-image-${file.id}`}
                width={600}
                height={400}
                className="object-fit h-[400px] rounded-lg"
              />
              <span>
                {index + 1} de {files?.length ?? 0}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="hidden md:block">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
