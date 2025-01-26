"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetPosts } from "../api";
import Image from "next/image";
import defaultImage from "public/default-fallback-image.png";
import { Skeleton } from "~/components/ui/skeleton";

export default function PlantGrid() {
  const { data, fetchNextPage, hasNextPage } = useGetPosts();

  return (
    <InfiniteScroll
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<Skeleton className="h-4 w-[250px]" />}
      dataLength={data?.length ?? 0}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.map((post) => (
          <Link
            href={`/museu/herbario/especie/${encodeURIComponent(post.specie.scientificName.toLowerCase())}`}
            key={post.id}
            className="group"
          >
            <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
              <CardHeader className="p-0">
                <Image
                  src={post.specie.files?.[0]?.path ?? defaultImage}
                  alt={`image-of-${post.specie.scientificName}`}
                  width={200}
                  height={200}
                  placeholder="blur"
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
                  <Badge variant="outline">{post.specie.taxonomy.family}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
}
