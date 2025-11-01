import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

import { PostDetails } from "./components/post-details";
import getCachedQueryClient from "~/lib/react-query";
import {
  fetchPostDetails,
  getPostDetailsQueryConfig,
  type PaginatedGetPostsApiResponse,
} from "../../api";
import { env } from "~/env";
import { publicApi } from "~/server/api";
import { type GetPostDetailsApiResponse } from "../../types/post.types";

type PlantPageParams = {
  params: Promise<{ name: string }>;
};

export const revalidate = 60 * 60;

export async function generateStaticParams() {
  try {
    const { data } = await publicApi.get<PaginatedGetPostsApiResponse>(
      "posts/species",
      { params: { page: 1, limit: 50 } },
    );

    return data.data.map((post) => ({
      name: post.specie.scientificName.toLowerCase(),
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({
  params,
}: PlantPageParams): Promise<Metadata> {
  const { name: rawName } = await params;
  const decodedName = decodeURIComponent(rawName);

  try {
    const details = await fetchPostDetails(decodedName);
    const specie = details.specie;
    const title = specie.commonName
      ? `${specie.commonName} (${specie.scientificName})`
      : specie.scientificName;
    const description =
      specie.description ??
      "Conheça em detalhes esta espécie catalogada pelo Herbário Virtual FC.";
    const image = specie.files?.[0]?.url;
    const canonicalPath = `/museu/herbario/especie/${encodeURIComponent(
      decodedName,
    )}`;

    return {
      title,
      description,
      alternates: {
        canonical: canonicalPath,
      },
      openGraph: {
        type: "article",
        url: new URL(canonicalPath, env.NEXT_PUBLIC_APP_URL).toString(),
        title,
        description,
        images: image
          ? [
              {
                url: image,
                alt: `Imagem da espécie ${specie.scientificName}`,
              },
            ]
          : undefined,
      },
      twitter: {
        card: image ? "summary_large_image" : "summary",
        title,
        description,
        images: image ? [image] : undefined,
      },
      keywords: [
        specie.scientificName,
        specie.commonName,
        ...specie.taxons.map((taxon) => taxon.name),
      ].filter(Boolean) as string[],
    };
  } catch (error) {
    const fallbackCanonical = `/museu/herbario/especie/${encodeURIComponent(decodedName)}`;
    const fallbackTitle = `Espécie - ${decodedName}`;

    return {
      title: fallbackTitle,
      description:
        "Detalhes sobre esta espécie do Herbário Virtual FC da UFRA.",
      alternates: {
        canonical: fallbackCanonical,
      },
    };
  }
}

export default async function PlantPage({
  params,
}: PlantPageParams) {
  const { name: rawName } = await params;
  const decodedName = decodeURIComponent(rawName);
  const client = getCachedQueryClient();
  const queryConfig = getPostDetailsQueryConfig(decodedName);
  await client.prefetchQuery(queryConfig);

  const dehydratedState = dehydrate(client);
  const postDetails = client.getQueryData<GetPostDetailsApiResponse>(
    queryConfig.queryKey,
  );

  const canonicalUrl = new URL(
    `/museu/herbario/especie/${encodeURIComponent(decodedName)}`,
    env.NEXT_PUBLIC_APP_URL,
  ).toString();

  const structuredData = postDetails
    ? {
        "@context": "https://schema.org",
        "@type": "Taxon",
        name:
          postDetails.specie.commonName ?? postDetails.specie.scientificName,
        alternateName: postDetails.specie.scientificName,
        url: canonicalUrl,
        description:
          postDetails.specie.description ??
          "Espécie catalogada pelo Herbário Virtual FC da UFRA.",
        image: postDetails.specie.files?.map((file) => file.url),
        parentTaxon: postDetails.specie.taxons.map((taxon) => ({
          "@type": "Taxon",
          name: taxon.name,
          taxonRank: taxon.hierarchy.name,
        })),
      }
    : null;

  return (
    <>
      {structuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      ) : null}
      <HydrationBoundary state={dehydratedState}>
        <PostDetails name={decodedName} />
      </HydrationBoundary>
    </>
  );
}
