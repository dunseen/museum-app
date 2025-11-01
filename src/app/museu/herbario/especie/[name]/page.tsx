import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";

import { PostDetails } from "./components/post-details";
import getCachedQueryClient from "~/lib/react-query";
import {
  fetchPostDetails,
  fetchPosts,
  getPostDetailsQueryConfig,
} from "../../api";
import {
  generateSpecieDetailsLdJson,
  generateSpecieDetailsMetadata,
} from "../../metadata/specie-details.metadata";
import { LdJsonScript } from "~/components/scripts/ld-json.script";

type PlantPageParams = {
  params: Promise<{ name: string }>;
};

export async function generateStaticParams() {
  try {
    const posts = await fetchPosts({ page: 1, limit: 50 });

    return posts.data.map((post) => ({
      name: post.specie.scientificName.toLowerCase(),
    }));
  } catch (error) {
    console.error("Error on generate static params", error);
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

    return generateSpecieDetailsMetadata(decodedName, details);
  } catch (error) {
    const fallbackCanonical = `/museu/herbario/especie/${encodeURIComponent(decodedName)}`;
    const fallbackTitle = `Espécie - ${decodedName}`;

    console.error("Error on generating metadata:", error);

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

export default async function PlantPage({ params }: PlantPageParams) {
  const { name: rawName } = await params;
  const decodedName = decodeURIComponent(rawName);
  const client = getCachedQueryClient();
  const queryConfig = getPostDetailsQueryConfig(decodedName);

  const postDetails = await client.fetchQuery(queryConfig);

  const dehydratedState = dehydrate(client);

  const ldJsonData = generateSpecieDetailsLdJson(decodedName, postDetails);

  return (
    <>
      <LdJsonScript data={ldJsonData} />
      <HydrationBoundary state={dehydratedState}>
        <PostDetails name={decodedName} />
      </HydrationBoundary>
    </>
  );
}
