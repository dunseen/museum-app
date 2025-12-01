'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import { useGetPosts } from '../api';
import Image from 'next/image';
import { usePost } from '../context/post-context';
import LoadingErrorWrapper from '~/components/ui/loading-error-wrapper';
import { type GetTaxonApiResponse } from '../types/taxonomy.types';
import dynamic from 'next/dynamic';
import { GridLoading } from './grid-loading';

const InfiniteScroll = dynamic(
  () => import('react-infinite-scroll-component'),
  {
    ssr: false,
    loading: () => <GridLoading />,
  },
);

export default function PlantGrid() {
  const { search } = usePost();

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetPosts(search);

  const getFamilyFromTaxons = (taxons: GetTaxonApiResponse[]) => {
    const family = taxons.find(
      (taxon) => taxon?.hierarchy?.name?.toLowerCase() === 'família',
    );

    if (family) {
      return family.name;
    }

    return null;
  };

  return (
    <LoadingErrorWrapper
      length={data?.length ?? 0}
      error={isError}
      loading={isLoading}
    >
      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<GridLoading />}
        dataLength={data?.length ?? 0}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {data?.map((post) => (
          <Link
            href={`/museu/herbario/especie/${encodeURIComponent(post.specie.scientificName.toLowerCase())}`}
            key={post.id}
            className="group"
          >
            <Card className="h-full cursor-pointer overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
              <CardHeader className="overflow-hidden p-0">
                <Image
                  title={post.specie.scientificName}
                  src={
                    post.specie.files?.[0]?.url ?? '/default-fallback-image.png'
                  }
                  alt={`image-of-${post.specie.scientificName}`}
                  width={200}
                  height={200}
                  priority
                  className="h-48 w-full rounded-t-lg object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-1 text-lg transition-colors duration-200 group-hover:text-primary">
                  {post.specie.commonName}
                </CardTitle>
                <p className="mb-2 text-sm italic text-muted-foreground transition-colors duration-200">
                  {post.specie.scientificName}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="transition-colors duration-200"
                  >
                    {getFamilyFromTaxons(post.specie.taxons)}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </InfiniteScroll>
    </LoadingErrorWrapper>
  );
}
