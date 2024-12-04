/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";

const plants = [
  {
    id: 1,
    name: "Rosa Mosqueta",
    scientificName: "Rosa rubiginosa",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Wild_Rosa_rubiginosa.jpg/1024px-Wild_Rosa_rubiginosa.jpg",
    family: "Rosaceae",
    habitat: "Florestas temperadas e regiões montanhosas",
    conservationStatus: "Não avaliado",
    description:
      "A Rosa Mosqueta é uma planta arbustiva conhecida por seus frutos ricos em vitamina C e seu uso em cosméticos e medicinas naturais.",
    distribution:
      "Nativa da Europa, pode ser encontrada em diversas regiões temperadas do mundo.",
    uses: "Óleos essenciais, chás, e produtos cosméticos.",
    author: {
      name: "Dr. João Oliveira",
      role: "Botânico",
      institution: "UFRA",
      publicationDate: "2023-10-12",
    },
  },
  {
    id: 2,
    name: "Cacto Mandacaru",
    scientificName: "Cereus jamacaru",
    image:
      "https://plantaeplanta.com.br/wp-content/uploads/2024/03/PSX_20240306_173606.jpg",
    family: "Cactaceae",
    habitat: "Caatinga brasileira",
    conservationStatus: "Pouco preocupante",
    description:
      "O Mandacaru é um cacto típico do semiárido brasileiro, conhecido por sua resistência à seca e importância cultural.",
    distribution: "Regiões semiáridas do Brasil, especialmente no Nordeste.",
    uses: "Alimento para gado e ornamento paisagístico.",
    author: {
      name: "Prof. Ana Costa",
      role: "Ecóloga",
      institution: "UFC",
      publicationDate: "2024-03-20",
    },
  },
  {
    id: 3,
    name: "Orquídea Borboleta",
    scientificName: "Phalaenopsis amabilis",
    image:
      "https://cobasiblog.blob.core.windows.net/production-ofc/2023/07/AdobeStock_436265223.webp",
    family: "Orchidaceae",
    habitat: "Florestas tropicais úmidas",
    conservationStatus: "Pouco preocupante",
    description:
      "Orquídea ornamental muito popular, caracterizada por suas flores delicadas e aparência exótica.",
    distribution: "Ásia tropical, incluindo Indonésia e Filipinas.",
    uses: "Decoração e cruzamentos para criação de novas variedades.",
    author: {
      name: "Dr. Fernanda Ribeiro",
      role: "Especialista em Orquídeas",
      institution: "USP",
      publicationDate: "2023-09-15",
    },
  },
  {
    id: 4,
    name: "Palmeira Real",
    scientificName: "Roystonea regia",
    image:
      "https://mudasherculandia.com.br/wp-content/uploads/2023/03/Palmeira-Real.jpg",
    family: "Arecaceae",
    habitat: "Regiões tropicais e subtropicais",
    conservationStatus: "Pouco preocupante",
    description:
      "Árvore ornamental imponente, amplamente cultivada em jardins e praças pelo mundo.",
    distribution: "Nativa de Cuba e América Central, amplamente cultivada.",
    uses: "Paisagismo e extração de palmito.",
    author: {
      name: "Dr. Carlos Almeida",
      role: "Engenheiro Agrônomo",
      institution: "UFPA",
      publicationDate: "2024-01-10",
    },
  },
  {
    id: 5,
    name: "Ipê Amarelo",
    scientificName: "Handroanthus albus",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Handroanthus_serratifolius.jpg/280px-Handroanthus_serratifolius.jpg",
    family: "Bignoniaceae",
    habitat: "Florestas tropicais e savanas",
    conservationStatus: "Pouco preocupante",
    description:
      "O Ipê Amarelo é uma árvore símbolo do Brasil, conhecida por sua floração exuberante e madeira de alta qualidade.",
    distribution: "América do Sul, especialmente no Brasil.",
    uses: "Paisagismo, madeira para construção e reflorestamento.",
    author: {
      name: "Dr. Luís Mendes",
      role: "Botânico",
      institution: "UFRJ",
      publicationDate: "2023-07-12",
    },
  },
  {
    id: 6,
    name: "Flor de Lis",
    scientificName: "Iris germanica",
    image:
      "https://blog.giulianaflores.com.br/wp-content/uploads/2021/03/flor-de-lis-capa.jpg",
    family: "Iridaceae",
    habitat: "Regiões temperadas",
    conservationStatus: "Pouco preocupante",
    description:
      "Flor ornamental que simboliza pureza e realeza, amplamente cultivada por sua beleza.",
    distribution: "Europa, Ásia e norte da África.",
    uses: "Decoração e produção de fragrâncias.",
    author: {
      name: "Dr. Júlia Antunes",
      role: "Horticultora",
      institution: "UFSC",
      publicationDate: "2023-11-05",
    },
  },
  {
    id: 7,
    name: "Samambaia Azul",
    scientificName: "Phlebodium aureum",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_731344-MLB45535161475_042021-O.webp",
    family: "Polypodiaceae",
    habitat: "Florestas tropicais úmidas",
    conservationStatus: "Pouco preocupante",
    description:
      "Planta epífita de folhas azuis esverdeadas, usada como ornamental em jardins internos.",
    distribution: "América Central e do Sul.",
    uses: "Paisagismo e purificação do ar.",
    author: {
      name: "Prof. Ricardo Lopes",
      role: "Ecologista",
      institution: "USP",
      publicationDate: "2024-02-22",
    },
  },
  {
    id: 8,
    name: "Goiabeira",
    scientificName: "Psidium guajava",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6raXiaon5LNzeND7hFUqzfhXuZRjAHVR9sw&s",
    family: "Myrtaceae",
    habitat: "Regiões tropicais e subtropicais",
    conservationStatus: "Pouco preocupante",
    description:
      "Árvore frutífera tropical amplamente cultivada por seus frutos nutritivos e saborosos.",
    distribution: "América do Sul e Central.",
    uses: "Produção de frutos para consumo in natura e indústria alimentícia.",
    author: {
      name: "Dr. Pedro Neves",
      role: "Fruticultor",
      institution: "UFV",
      publicationDate: "2024-03-01",
    },
  },
  {
    id: 9,
    name: "Araucária",
    scientificName: "Araucaria angustifolia",
    image:
      "https://pbr-str.srvsite.com/arquivos/9124/noticias/not-9124-20230104150122.jpg",
    family: "Araucariaceae",
    habitat: "Regiões montanhosas e subtropicais",
    conservationStatus: "Ameaçada",
    description:
      "Árvore icônica das regiões do sul do Brasil, famosa por suas sementes, o pinhão.",
    distribution: "Sul do Brasil, Argentina e Paraguai.",
    uses: "Madeira e alimento.",
    author: {
      name: "Dr. Marcelo Azevedo",
      role: "Botânico",
      institution: "UFPR",
      publicationDate: "2023-06-18",
    },
  },
  {
    id: 10,
    name: "Hibisco",
    scientificName: "Hibiscus rosa-sinensis",
    image:
      "https://content.paodeacucar.com/wp-content/uploads/2020/01/o-que-%C3%A9-hibisco-capa.jpg",
    family: "Malvaceae",
    habitat: "Regiões tropicais e subtropicais",
    conservationStatus: "Pouco preocupante",
    description: "Flor ornamental vibrante, usada em infusões e paisagismo.",
    distribution: "Ásia e regiões tropicais do mundo.",
    uses: "Chás, cosméticos e paisagismo.",
    author: {
      name: "Dra. Carolina Souza",
      role: "Horticultora",
      institution: "UFRGS",
      publicationDate: "2024-04-15",
    },
  },
];

export default function PlantPage({ params }: { params: { name: string } }) {
  const plant = plants.find(
    (p) =>
      p.name.toLowerCase() === decodeURIComponent(params.name).toLowerCase(),
  );

  if (!plant) {
    notFound();
  }

  return (
    <section className="mx-auto min-h-screen px-4 py-8">
      <Link
        href="/"
        className="mb-4 flex items-center text-primary hover:underline"
      >
        <ChevronLeft className="mr-1" />
        Voltar para o início
      </Link>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={plant.image}
            alt={plant.name}
            width={600}
            height={400}
            className="h-[400px] w-full rounded-lg object-cover"
          />
        </div>
        <div>
          <h1 className="mb-2 text-3xl font-bold">{plant.name}</h1>
          <p className="mb-4 text-xl italic text-muted-foreground">
            {plant.scientificName}
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge>{plant.family}</Badge>
            <Badge variant="outline">{plant.habitat}</Badge>
            <Badge variant="secondary">{plant.conservationStatus}</Badge>
          </div>
          <p className="mb-4">{plant.description}</p>
          <h2 className="mb-2 text-2xl font-semibold">Distribution</h2>
          <p className="mb-4">{plant.distribution}</p>
          <h2 className="mb-2 text-2xl font-semibold">Uses</h2>
          <p className="mb-4">{plant.uses}</p>
        </div>
      </div>
      <div className="mt-8 rounded-lg bg-secondary p-6">
        <h2 className="mb-4 text-2xl font-semibold">About the Author</h2>
        <p className="text-lg font-medium">{plant.author.name}</p>
        <p className="text-muted-foreground">
          {plant.author.role} at {plant.author.institution}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Published on{" "}
          {new Date(plant.author.publicationDate).toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}
