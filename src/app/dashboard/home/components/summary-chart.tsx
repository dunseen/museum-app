"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Fev",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Abr",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Mai",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Ago",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Set",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Out",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
  {
    name: "Dez",
    total: Math.floor(Math.random() * 2500) + 1000,
  },
];

export function SummaryChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Espécies Registradas</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Bar
              dataKey="total"
              fill="currentColor"
              radius={[4, 4, 0, 0]}
              className="fill-primary"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
