"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Can } from "../../context/ability-context";
import Link from "next/link";
import {
  RecentActivities,
  type LastPostsSimplified,
} from "./recent-activities";
import { useGetLastPosts } from "../api";

export function ActivitiesContainer() {
  const { data } = useGetLastPosts();

  if (!data) return null;

  const activities: LastPostsSimplified[] = data.map((post) => ({
    id: post.id,
    author: `${post?.author?.firstName} ${post?.author?.lastName}`,
    date: new Date(post.createdAt),
    resource: post.specie.scientificName,
    status: post.status,
  }));

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
          {data.length === 0 && (
            <p className="text-sm text-muted-foreground">
              Nenhuma atividade recente.
            </p>
          )}

          <RecentActivities data={activities} />
        </CardContent>
      </Card>
    </Can>
  );
}
