"use client";

import { BookOpen, Layers, List, Users } from "lucide-react";
import { type GetHomeSummaryApiResponse, useGetHomeSummary } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type SummaryCard = {
  title: string;
  key: keyof GetHomeSummaryApiResponse;
  value: number;
  icon: React.ReactNode;
};

const cards: SummaryCard[] = [
  {
    title: "Espécies",
    key: "specieCount",
    value: 0,
    icon: <BookOpen />,
  },
  {
    title: "Famílias",
    key: "familyCount",
    value: 0,
    icon: <Users />,
  },
  {
    title: "Ordens",
    key: "genusCount",
    value: 0,
    icon: <Layers />,
  },
  {
    title: "Características",
    key: "characteristicCount",
    value: 0,
    icon: <List />,
  },
];
export const SummaryCountList: React.FC = () => {
  const { data } = useGetHomeSummary();

  if (!data) return null;

  const cardList = cards.map((card) => {
    return {
      ...card,
      value: data[card.key],
    };
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cardList.map((c) => (
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
  );
};
