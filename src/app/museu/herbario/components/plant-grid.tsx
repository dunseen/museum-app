/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetPosts } from "../api";
import Image from "next/image";
import defaultImage from "public/default-fallback-image.png";
import { Skeleton } from "~/components/ui/skeleton";

// Mock data for plants
const plants = [
  {
    id: 1,
    name: "Rosa Mosqueta",
    scientificName: "Rosa rubiginosa",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Wild_Rosa_rubiginosa.jpg/1024px-Wild_Rosa_rubiginosa.jpg", // Exemplo de imagem real
    family: "Rosaceae",
  },
  {
    id: 2,
    name: "Cacto Mandacaru",
    scientificName: "Cereus jamacaru",
    image:
      "https://plantaeplanta.com.br/wp-content/uploads/2024/03/PSX_20240306_173606.jpg",
    family: "Cactaceae",
  },
  {
    id: 3,
    name: "Orquídea Borboleta",
    scientificName: "Phalaenopsis amabilis",
    image:
      "https://cobasiblog.blob.core.windows.net/production-ofc/2023/07/AdobeStock_436265223.webp",
    family: "Orchidaceae",
  },
  {
    id: 4,
    name: "Palmeira Real",
    scientificName: "Roystonea regia",
    image:
      "https://mudasherculandia.com.br/wp-content/uploads/2023/03/Palmeira-Real.jpg",
    family: "Arecaceae",
  },
  {
    id: 5,
    name: "Ipê Amarelo",
    scientificName: "Handroanthus albus",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Handroanthus_serratifolius.jpg/280px-Handroanthus_serratifolius.jpg",
    family: "Bignoniaceae",
  },
  {
    id: 6,
    name: "Flor de Lis",
    scientificName: "Iris germanica",
    image:
      "https://blog.giulianaflores.com.br/wp-content/uploads/2021/03/flor-de-lis-capa.jpg",
    family: "Iridaceae",
  },
  {
    id: 7,
    name: "Samambaia Azul",
    scientificName: "Phlebodium aureum",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_731344-MLB45535161475_042021-O.webp",
    family: "Polypodiaceae",
  },
  {
    id: 8,
    name: "Goiabeira",
    scientificName: "Psidium guajava",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6raXiaon5LNzeND7hFUqzfhXuZRjAHVR9sw&s",
    family: "Myrtaceae",
  },
  {
    id: 9,
    name: "Araucária",
    scientificName: "Araucaria angustifolia",
    image:
      "https://pbr-str.srvsite.com/arquivos/9124/noticias/not-9124-20230104150122.jpg",
    family: "Araucariaceae",
  },
  {
    id: 10,
    name: "Hibisco",
    scientificName: "Hibiscus rosa-sinensis",
    image:
      "https://content.paodeacucar.com/wp-content/uploads/2020/01/o-que-%C3%A9-hibisco-capa.jpg",
    family: "Malvaceae",
  },
];

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
