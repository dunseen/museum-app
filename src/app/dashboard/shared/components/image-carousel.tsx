import Image from 'next/image';
import * as React from 'react';

import { Card, CardContent, CardFooter } from '~/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '~/components/ui/carousel';

type ImageCarouselProps = {
  images: string[];
};
export function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel className="w-full max-w-xs self-center">
      <CarouselContent>
        {images.map((url, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    src={url}
                    alt={`image-${index}`}
                    width={400}
                    height={400}
                  />
                </CardContent>
                <CardFooter>
                  {index + 1} de {images.length}
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
