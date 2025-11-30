import { env } from "~/config/env.client";
import { type GetPostDetailsApiResponse } from "../types/post.types";

export function generateSpecieDetailsMetadata(
  name: string,
  postDetails: GetPostDetailsApiResponse,
) {
  const specie = postDetails.specie;
  const images = specie.files.map((f) => ({
    url: f.url,
    alt: `Imagem da espécie ${specie.scientificName}`,
  }));

  return {
    title: specie.commonName
      ? `${specie.commonName} (${specie.scientificName})`
      : specie.scientificName,
    description:
      specie.description ??
      "Conheça em detalhes esta espécie catalogada pelo Herbário Virtual FC.",
    openGraph: {
      type: "article",
      url: new URL(
        `/museu/herbario/especie/${encodeURIComponent(name)}`,
        env.NEXT_PUBLIC_APP_URL,
      ),
      title: specie.commonName
        ? `${specie.commonName} (${specie.scientificName})`
        : specie.scientificName,
      description:
        specie.description ??
        "Conheça em detalhes esta espécie catalogada pelo Herbário Virtual FC.",
      images,
    },
    twitter: {
      card: specie.files?.[0]?.url ? "summary_large_image" : "summary",
      title: specie.commonName
        ? `${specie.commonName} (${specie.scientificName})`
        : specie.scientificName,
      description:
        specie.description ??
        "Conheça em detalhes esta espécie catalogada pelo Herbário Virtual FC.",
      images,
    },
    keywords: [
      specie.scientificName,
      specie.commonName,
      ...specie.taxons.map((taxon) => taxon.name),
      ...specie.characteristics.map((char) => char.name),
    ].filter(Boolean),
  };
}

export function generateSpecieDetailsLdJson(
  decodedName: string,
  postDetails: GetPostDetailsApiResponse,
) {
  if (!postDetails) return null;

  const canonicalUrl = new URL(
    `/museu/herbario/especie/${encodeURIComponent(decodedName)}`,
    env.NEXT_PUBLIC_APP_URL,
  );

  return {
    "@context": "https://schema.org",
    "@type": "Taxon",
    name: postDetails.specie.commonName ?? postDetails.specie.scientificName,
    alternateName: postDetails.specie.scientificName,
    url: canonicalUrl,
    description:
      postDetails.specie.description ??
      "Espécie catalogada pelo Herbário Virtual FC da UFRA.",
    image: postDetails.specie.files?.map((file) => file.url),
    characteristics: postDetails.specie.characteristics.map((char) => ({
      "@type": "Characteristic",
      name: char.name,
      type: char.type,
    })),
    parentTaxon: postDetails.specie.taxons.map((taxon) => ({
      "@type": "Taxon",
      name: taxon.name,
      taxonRank: taxon.hierarchy.name,
    })),
  };
}
