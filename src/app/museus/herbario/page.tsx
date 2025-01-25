import HerbariumHero from "./components/herbarium-hero";
import PlantGrid from "./components/plant-grid";
import PlantSearch from "./components/plant-search";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HerbariumHero />
      <div className="container mx-auto px-4 py-8">
        <PlantSearch />
        <PlantGrid />
      </div>
    </main>
  );
}
