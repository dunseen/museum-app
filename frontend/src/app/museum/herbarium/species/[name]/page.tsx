import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";

const plants = [
  {
    id: 1,
    name: "Açaí Palm",
    scientificName: "Euterpe oleracea",
    image: "/placeholder.svg?height=400&width=600",
    family: "Arecaceae",
    habitat: "Wetland",
    conservationStatus: "Least Concern",
    description:
      "The açaí palm is a species of palm tree cultivated for its fruit and hearts of palm. It is native to tropical Central and South America, mainly in floodplains and swamps.",
    distribution:
      "Native to the Amazon Rainforest, particularly in Brazil, Peru, Colombia, and Venezuela.",
    uses: "The fruit is commonly used in food and beverages, while the heart of palm is a delicacy. The leaves are used for basketry and roof thatching.",
    author: {
      name: "Dr. Maria Silva",
      role: "Botanist",
      institution: "UFRA",
      publicationDate: "2023-05-15",
    },
  },
  {
    id: 2,
    name: "Brazil Nut Tree",
    scientificName: "Bertholletia excelsa",
    image: "/placeholder.svg?height=400&width=600",
    family: "Lecythidaceae",
    habitat: "Rainforest",
    conservationStatus: "Vulnerable",
    description:
      "The Brazil nut is a South American tree in the family Lecythidaceae, and it is also the name of the tree's commercially harvested edible seeds.",
    distribution:
      "Native to the Guianas, Venezuela, Brazil, eastern Colombia, eastern Peru, and eastern Bolivia.",
    uses: "The nuts are harvested for their edible seeds, which are rich in selenium, and the empty pods are used as containers or crafted into jewelry.",
    author: {
      name: "Dr. João Santos",
      role: "Ecologist",
      institution: "UFRA",
      publicationDate: "2023-06-22",
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
          <Image
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
