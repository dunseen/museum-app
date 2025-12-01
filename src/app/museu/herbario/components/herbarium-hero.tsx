import { Leaf, Search, BookOpen } from 'lucide-react';

export default function HerbariumHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 px-4 py-16 text-white md:py-24">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.08),transparent_50%)]" />

      {/* Floating botanical decorations */}
      <div className="pointer-events-none absolute right-10 top-10 opacity-10">
        <Leaf className="h-32 w-32 rotate-12 md:h-48 md:w-48" />
      </div>
      <div className="pointer-events-none absolute bottom-10 left-10 opacity-10">
        <Leaf className="h-24 w-24 -rotate-45 md:h-36 md:w-36" />
      </div>

      <div className="container relative mx-auto max-w-5xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-sm">
          <Leaf className="h-4 w-4" />
          <span className="text-sm font-medium">
            Herbário Dr. Felisberto Camargo
          </span>
        </div>

        {/* Main Title */}
        <h1 className="mb-4 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
          Explore a Flora
          <span className="block bg-gradient-to-r from-green-100 to-emerald-200 bg-clip-text text-transparent">
            Amazônica
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-8 max-w-2xl text-base text-green-50 md:text-lg lg:text-xl">
          Descubra e aprenda sobre diversas espécies botânicas catalogadas e
          preservadas pelo herbário virtual da UFRA
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Search className="h-4 w-4 text-green-200" />
            <span className="font-medium">Busca Avançada</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
            <BookOpen className="h-4 w-4 text-green-200" />
            <span className="font-medium">Pesquisa Científica</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm">
            <Leaf className="h-4 w-4 text-green-200" />
            <span className="font-medium">Biodiversidade</span>
          </div>
        </div>
      </div>
    </section>
  );
}
