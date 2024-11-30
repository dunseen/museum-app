import { BookOpen, Layers, List, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Overview, RecentActivities } from "./components/";
import Link from "next/link";

export default function Page() {
  const cards = [
    {
      title: "Espécies",
      value: 95,
      icon: <BookOpen />,
    },
    {
      title: "Famílias",
      value: 95,
      icon: <Users />,
    },
    {
      title: "Ordens",
      value: 95,
      icon: <Layers />,
    },
    {
      title: "Características",
      value: 95,
      icon: <List />,
    },
  ];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{c.title}</CardTitle>
              {c.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Espécies Registradas</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="inline-flex">
              Atividades
              <Link
                href={"/dashboard/system/activities"}
                className="ml-auto text-base font-medium underline"
              >
                Ver todas
              </Link>
            </CardTitle>
            <CardDescription>
              Últimas 10 movimentações no sistema.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivities />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
