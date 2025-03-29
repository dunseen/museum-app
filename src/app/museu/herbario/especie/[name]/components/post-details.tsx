"use client";

import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetPostDetails } from "../../../api";
import defaultImage from "public/default-fallback-image.png";
import LoadingErrorWrapper from "~/components/ui/loading-error-wrapper";
import { Badge } from "~/components/ui/badge";
import { ImageCarousel } from "./image-carousel";

type PostDetailsProps = {
  name?: string;
};
export const PostDetails: React.FC<Readonly<PostDetailsProps>> = ({ name }) => {
  const { data, isLoading, isError } = useGetPostDetails(name ?? "");

  const title = data?.specie?.commonName ?? data?.specie?.scientificName;
  const subtitle = data?.specie?.commonName ? data.specie.scientificName : "-";
  const taxons = data?.specie?.taxons;

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
          <div className="p-8">
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
                  <p className="capitalize">{t.hierarchy}</p>
                  <Badge>{t.name}</Badge>
                </div>
              ))}
            </div>
            <p className="mb-8">{data?.specie?.description}</p>

            <h2 className="mb-4 text-2xl font-bold">Características:</h2>

            {data?.specie.characteristics?.map((c) => (
              <section key={c.id} className="mb-4 flex items-center gap-8">
                <div>
                  <h3 className="text-xl font-semibold capitalize">{c.type}</h3>
                  <p className="mb-1">{c.name}</p>
                  <p className="text-sm italic text-gray-400">
                    {c.description}
                  </p>
                </div>
                {/* TODO ADD DIALOG WITH CAROUSEL */}
                <Image
                  src={c?.files[0]?.url ?? defaultImage}
                  alt={`${c.type}-${c.name}-${c.description}-`}
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] rounded-lg object-cover"
                />
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
    </LoadingErrorWrapper>
  );
};
