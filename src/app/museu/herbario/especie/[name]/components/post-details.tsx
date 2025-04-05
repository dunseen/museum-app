"use client";

import { ChevronLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useGetPostDetails } from "../../../api";
import LoadingErrorWrapper from "~/components/ui/loading-error-wrapper";
import { Badge } from "~/components/ui/badge";
import { ImageCarousel } from "./image-carousel";
import { decimalToDMS } from "~/utils/lat-long";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
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

  const title = data?.specie?.commonName ?? data?.specie?.scientificName;
  const subtitle = data?.specie?.commonName ? data.specie.scientificName : "-";
  const taxons = data?.specie?.taxons;

  const [selectedImages, setSelectedImages] =
    React.useState<SelectedFilesProps | null>(null);

  const handleImageClick = (name: string, files: FileTypeApiResponse[]) => {
    setSelectedImages({
      files,
      name,
    });
  };

  return (
    <LoadingErrorWrapper error={isError} loading={isLoading}>
      <section className="mx-auto min-h-screen px-4 py-8">
        <Link
          href="/museu/herbario"
          className="mb-4 flex items-center text-primary hover:underline"
        >
          <ChevronLeft className="mr-1" />
          Voltar para o início
        </Link>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="px:0 relative max-w-[600px] lg:px-8">
            <ImageCarousel
              files={data?.specie.files ?? []}
              specieName={data?.specie.scientificName ?? ""}
            />
          </div>

          <div>
            <h1 className="mb-2 text-3xl font-bold">{title}</h1>
            <p className="mb-4 text-xl italic text-muted-foreground">
              {subtitle}
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {taxons?.map((t) => (
                <div key={t.name}>
                  <p className="capitalize">{t.hierarchy.name}</p>
                  <Badge>{t.name}</Badge>
                </div>
              ))}
            </div>
            <ul className="mb-8">
              <li>
                <span className="font-semibold">Descrição: </span>{" "}
                {data?.specie?.description}
              </li>
              <li>
                <span className="font-semibold">Localização: </span>{" "}
                {data?.specie?.location.address} -{" "}
                {data?.specie.location.city.name} /{" "}
                {data?.specie.location.state.code}
              </li>
              <li>
                <span className="font-semibold">Coordenadas: </span>{" "}
                {decimalToDMS(data?.specie.location.lat ?? "0", true)} /{" "}
                {decimalToDMS(data?.specie.location.long ?? "0", false)}
              </li>
            </ul>

            <h2 className="mb-4 text-xl font-bold">Características:</h2>

            {data?.specie.characteristics?.map((c) => (
              <section key={c.id} className="mb-4 flex items-center gap-8">
                <div>
                  <h3 className="text-lg font-semibold capitalize">
                    {c.type.name}
                  </h3>
                  <p className="mb-1">{c.name}</p>
                </div>

                <Button
                  variant="outline"
                  className="self-end"
                  size="icon"
                  disabled={!c.files?.length}
                  title={c.files?.length ? "Ver imagem" : "Sem imagem"}
                  onClick={() => handleImageClick(c.name, c.files ?? [])}
                >
                  <ImageIcon />
                </Button>
              </section>
            ))}
          </div>
        </div>
        <div className="mt-8 rounded-lg bg-secondary p-6">
          <h2 className="mb-4 text-2xl font-semibold">Sobre o autor</h2>
          <p className="text-lg font-medium">
            {data?.author?.firstName} {data?.author?.lastName}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Publicado em {data?.updatedAt}
          </p>
        </div>
      </section>

      {!!selectedImages?.files?.length ? (
        <Dialog
          open={!!selectedImages?.files?.length}
          onOpenChange={() => setSelectedImages(null)}
        >
          <DialogContent>
            <DialogTitle className="capitalize">
              {selectedImages.name}
            </DialogTitle>
            <DialogHeader>
              <ImageCarousel
                specieName={selectedImages.name}
                files={selectedImages?.files ?? []}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : null}
    </LoadingErrorWrapper>
  );
};
