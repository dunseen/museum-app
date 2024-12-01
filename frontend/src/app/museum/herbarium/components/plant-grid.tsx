"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

// Mock data for plants
const plants = [
  {
    id: 1,
    name: "Açaí Palm",
    scientificName: "Euterpe oleracea",
    image: "/placeholder.svg?height=200&width=200",
    family: "Arecaceae",
    habitat: "Wetland",
    conservationStatus: "Least Concern",
  },
  {
    id: 2,
    name: "Brazil Nut Tree",
    scientificName: "Bertholletia excelsa",
    image: "/placeholder.svg?height=200&width=200",
    family: "Lecythidaceae",
    habitat: "Rainforest",
    conservationStatus: "Vulnerable",
  },
  {
    id: 3,
    name: "Rubber Tree",
    scientificName: "Hevea brasiliensis",
    image: "/placeholder.svg?height=200&width=200",
    family: "Euphorbiaceae",
    habitat: "Rainforest",
    conservationStatus: "Near Threatened",
  },
  {
    id: 4,
    name: "Kapok Tree",
    scientificName: "Ceiba pentandra",
    image: "/placeholder.svg?height=200&width=200",
    family: "Malvaceae",
    habitat: "Rainforest",
    conservationStatus: "Least Concern",
  },
  {
    id: 5,
    name: "Guarana",
    scientificName: "Paullinia cupana",
    image: "/placeholder.svg?height=200&width=200",
    family: "Sapindaceae",
    habitat: "Rainforest",
    conservationStatus: "Least Concern",
  },
  {
    id: 6,
    name: "Pau-brasil",
    scientificName: "Paubrasilia echinata",
    image: "/placeholder.svg?height=200&width=200",
    family: "Fabaceae",
    habitat: "Atlantic Forest",
    conservationStatus: "Endangered",
  },
];

export default function PlantGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {plants.map((plant) => (
        <Link
          href={`/museum/herbarium/species/${encodeURIComponent(plant.name.toLowerCase())}`}
          key={plant.id}
          className="group"
        >
          <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
            <CardHeader className="p-0">
              <Image
                src={plant.image}
                alt={plant.name}
                width={200}
                height={200}
                className="h-48 w-full rounded-t-lg object-cover transition-opacity group-hover:opacity-90"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-1 text-lg transition-colors group-hover:text-primary">
                {plant.name}
              </CardTitle>
              <p className="mb-2 text-sm italic text-muted-foreground">
                {plant.scientificName}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{plant.family}</Badge>
                <Badge variant="outline">{plant.habitat}</Badge>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
