import { Leaf } from "lucide-react";

export default function HerbariumHero() {
  return (
    <div className="bg-[#006633] py-10 text-white md:py-12">
      <div className="container mx-auto px-4 text-center">
        <Leaf className="mx-auto mb-4 h-8 w-8 md:h-14 md:w-14" />
        <h1 className="mb-2 text-2xl font-bold md:mb-4 md:text-4xl">
          Herbário Virtual Felisberto Camargo
        </h1>
        <p className="text-md mb-8 md:text-xl">
          Explore a coleção de plantas do herbário virtual da universidade
          federal rural da amazônia.
        </p>
      </div>
    </div>
  );
}
