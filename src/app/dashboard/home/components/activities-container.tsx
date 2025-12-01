'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Can } from '../../context/ability-context';
import Link from 'next/link';
import {
  RecentActivities,
  type LastPostsSimplified,
} from './recent-activities';
import { useGetChangeRequests } from '../../system/api';

export function ActivitiesContainer() {
  const { data } = useGetChangeRequests({ limit: 10, page: 1 });

  if (!data) return null;

  const activities: LastPostsSimplified[] = data?.data?.map((cr) => ({
    id: String(cr.changeRequest.id),
    author: `${cr.changeRequest.proposedBy.firstName ?? ''} ${cr.changeRequest.proposedBy.lastName ?? ''}`,
    date: new Date(cr.createdAt),
    resource: cr.entityName,
    status: cr.changeRequest.status,
    action: cr.changeRequest.action,
  }));

  return (
    <Can I={'manage'} a={'System'}>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="inline-flex">
            Atividades
            <Link
              href={'/dashboard/system/activities'}
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
          {data?.data?.length === 0 && (
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
