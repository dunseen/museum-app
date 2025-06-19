"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useGetPostDetails } from "../../../api";
import LoadingErrorWrapper from "~/components/ui/loading-error-wrapper";
import { ImageCarousel } from "./image-carousel";
import { PostDetailsHeader } from "./PostDetailsHeader";
import { PostDetailsTechnicalData } from "./PostDetailsTechnicalData";
import { PostDetailsCharacteristics } from "./PostDetailsCharacteristics";
import { PostDetailsImageDialog } from "./PostDetailsImageDialog";
import { type FileTypeApiResponse } from "../../../types/file.types";

type PostDetailsProps = {
  name?: string;
};

type SelectedFilesProps = {
  files: FileTypeApiResponse[];
  name: string;
};
export const PostDetails: React.FC<Readonly<PostDetailsProps>> = ({ name }) => {
  const { data, isLoading, isError } = useGetPostDetails(name ?? "");
  const [selectedImages, setSelectedImages] =
    React.useState<SelectedFilesProps | null>(null);

  const handleImageClick = (name: string, files: FileTypeApiResponse[]) => {
    setSelectedImages({ files, name });
  };

  if (!data) {
    return null;
  }

  return (
    <LoadingErrorWrapper error={isError} loading={isLoading}>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/museu/herbario"
          className="mb-6 inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Voltar para o início
        </Link>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(280px,500px)_1fr]">
          <ImageCarousel
            files={data?.specie.files ?? []}
            specieName={data?.specie.scientificName ?? ""}
          />
          <div className="flex flex-col gap-6">
            <PostDetailsHeader specie={data?.specie} />
            <PostDetailsTechnicalData
              specie={data?.specie}
              createdAt={data?.createdAt}
            />
          </div>
        </div>
        <PostDetailsCharacteristics
          characteristics={data?.specie.characteristics ?? []}
          onImageClick={handleImageClick}
        />
        <PostDetailsImageDialog
          selectedImages={selectedImages}
          onClose={() => setSelectedImages(null)}
        />
      </section>
    </LoadingErrorWrapper>
  );
};
