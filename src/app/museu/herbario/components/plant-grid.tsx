"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import dynamic from "next/dynamic";
import { useGetPosts } from "../api";
import Image from "next/image";
import defaultImage from "public/default-fallback-image.png";
import { Skeleton } from "~/components/ui/skeleton";
import { usePost } from "../context/post-context";
import LoadingErrorWrapper from "~/components/ui/loading-error-wrapper";
import { type GetTaxonApiResponse } from "../types/taxonomy.types";

const InfiniteScroll = dynamic(() => import("react-infinite-scroll-component"), {
  ssr: false,
  loading: () => <Skeleton className="h-4 w-[250px]" />,
});

export default function PlantGrid() {
  const { search } = usePost();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetPosts(search);

  const getFamilyFromTaxons = (taxons: GetTaxonApiResponse[]) => {
    const family = taxons.find(
      (taxon) => taxon?.hierarchy?.name?.toLowerCase() === "família",
    );

    if (family) {
      return family.name;
    }

    return null;
  };

  return (
    <LoadingErrorWrapper error={isError} loading={isLoading}>
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Skeleton className="h-4 w-[250px]" />}
        dataLength={data?.length ?? 0}
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.map((post, index) => (
            <Link
              href={`/museu/herbario/especie/${encodeURIComponent(post.specie.scientificName.toLowerCase())}`}
              key={post.id}
              className="group"
            >
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
                <CardHeader className="p-0">
                  <Image
                    title={post.specie.scientificName}
                    src={post.specie.files?.[0]?.url ?? defaultImage}
                    alt={`image-of-${post.specie.scientificName}`}
                    width={200}
                    height={200}
                    priority={index === 0}
                    className="h-48 w-full rounded-t-lg object-cover transition-opacity group-hover:opacity-90"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="mb-1 text-lg transition-colors group-hover:text-primary">
                    {post.specie.commonName}
                  </CardTitle>
                  <p className="mb-2 text-sm italic text-muted-foreground">
                    {post.specie.scientificName}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {getFamilyFromTaxons(post.specie.taxons)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </InfiniteScroll>
    </LoadingErrorWrapper>
  );
}
