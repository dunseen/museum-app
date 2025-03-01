"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Can } from "../context/ability-context";
import Link from "next/link";
import { RecentActivities } from "./recent-activities";

export function ActivitiesContainer() {
  return (
    <Can I={"manage"} a={"System"}>
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
    </Can>
  );
}
