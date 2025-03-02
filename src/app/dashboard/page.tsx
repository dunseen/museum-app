import { BookOpen, Layers, List, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Overview } from "./components/";
import { ActivitiesContainer } from "./components/activities-container";

export default function Page() {
  const cards = [
    {
      title: "Espécies",
      value: 3500,
      icon: <BookOpen />,
    },
    {
      title: "Famílias",
      value: 5,
      icon: <Users />,
    },
    {
      title: "Ordens",
      value: 12,
      icon: <Layers />,
    },
    {
      title: "Características",
      value: 500,
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

        <ActivitiesContainer />
      </div>
    </>
  );
}
