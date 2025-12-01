import React from 'react';
import { LocationMapHandler } from '~/components/map';
import { BotanicalLayout } from '~/components/layouts';
import { Card, CardContent } from '~/components/ui/card';
import { Badge } from '~/components/ui/badge';
import {
  BookOpen,
  Leaf,
  MapPin,
  Users,
  GraduationCap,
  TreePine,
} from 'lucide-react';

const Page: React.FC = () => {
  return (
    <BotanicalLayout>
      <section className="mx-auto max-w-5xl px-6 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <Leaf className="h-5 w-5 text-primary" />
            <Badge variant="outline" className="border-primary/20">
              Desde o século XX
            </Badge>
          </div>
          <h1 className="mb-4 text-3xl font-bold text-green-700 md:text-5xl">
            Herbário Dr. Felisberto Camargo
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Preservando e catalogando a riquíssima flora amazônica para futuras
            gerações
          </p>
        </div>

        {/* Key Stats Cards */}
        <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-3 inline-flex rounded-lg bg-emerald-100 p-3 text-emerald-700">
                <TreePine className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Flora Amazônica</h3>
              <p className="text-sm text-muted-foreground">
                Catalogação e preservação de espécies da maior floresta tropical
                do mundo
              </p>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-3 inline-flex rounded-lg bg-blue-100 p-3 text-blue-700">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">UFRA</h3>
              <p className="text-sm text-muted-foreground">
                Vinculado à Universidade Federal Rural da Amazônia
              </p>
            </CardContent>
          </Card>

          <Card className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="mb-3 inline-flex rounded-lg bg-amber-100 p-3 text-amber-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Pesquisa</h3>
              <p className="text-sm text-muted-foreground">
                Base para estudos em ecologia, biologia e conservação ambiental
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Cards */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-l-4 border-l-primary shadow-md">
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Nossa História
                </h2>
              </div>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                O{' '}
                <strong className="text-foreground">
                  Herbário Dr. Felisberto Camargo (FC)
                </strong>
                , localizado no estado do Pará, é um acervo de grande relevância
                para o estudo, documentação e preservação da riquíssima flora
                amazônica. Sua história está profundamente conectada à missão de
                compreender e proteger a biodiversidade de uma das regiões mais
                importantes do planeta.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Vinculado à{' '}
                <strong className="text-foreground">
                  Universidade Federal Rural da Amazônia (UFRA)
                </strong>
                , o herbário foi fundado na segunda metade do século XX com o
                objetivo primordial de coletar, catalogar e conservar espécies
                vegetais da vasta Amazônia. Seu acervo é composto por uma
                diversidade de exemplares cuidadosamente preservados, servindo
                como base para estudos acadêmicos e científicos voltados à
                ecologia, biologia e conservação ambiental.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-blue-500 shadow-md">
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <h2 className="text-xl font-semibold text-foreground">
                  Nossa Missão
                </h2>
              </div>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Além de ser uma referência para a comunidade científica, o
                herbário também desempenha um papel essencial para o público em
                geral, fornecendo informações valiosas sobre a riqueza da flora
                regional. Pesquisadores, estudantes e entusiastas da botânica
                encontram no Herbário FC um espaço de aprendizado, colaboração e
                descoberta.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Sua atuação é crucial não apenas para o estudo da biodiversidade
                amazônica, mas também para a identificação e conservação de
                espécies endêmicas e raras. Além disso, o herbário dá suporte a
                pesquisas que buscam soluções para a sustentabilidade ambiental
                da maior floresta tropical do mundo, contribuindo para o
                equilíbrio ecológico global e reforçando a importância da
                preservação dos recursos naturais para as gerações futuras.
              </p>
            </CardContent>
          </Card>

          {/* Location Section */}
          <Card className="overflow-hidden border-l-4 border-l-emerald-500 shadow-md">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-emerald-500" />
                <h2 className="text-xl font-semibold text-foreground">
                  Nossa Localização
                </h2>
              </div>
              <div className="overflow-hidden rounded-lg border shadow-sm">
                <LocationMapHandler
                  lat={-1.458412}
                  lng={-48.434518}
                  title="Herbário Dr. Felisberto Camargo (FC)"
                  zoom={15}
                  height="400px"
                />
              </div>
              <div className="mt-4 rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Endereço:</strong>{' '}
                  Universidade Federal Rural da Amazônia - Campus Belém
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Cidade:</strong> Belém,
                  Pará - Brasil
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </BotanicalLayout>
  );
};

export default Page;
