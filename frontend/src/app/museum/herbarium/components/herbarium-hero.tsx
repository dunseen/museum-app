import { Leaf } from "lucide-react";

export default function HerbariumHero() {
  return (
    <div className="bg-[#006633] py-16 text-white md:py-24">
      <div className="container mx-auto px-4 text-center">
        <Leaf className="mx-auto mb-4 h-8 w-8 md:h-16 md:w-16" />
        <h1 className="mb-2 text-2xl font-bold md:mb-4 md:text-6xl">
          Herbário Virtual UFRA
        </h1>
        <p className="text-md mb-8 md:text-2xl">
          Explore a coleção de plantas da Universidade Federal Rural da Amazônia
        </p>
      </div>
    </div>
  );
}
