import { CheckCircle, Clock, XCircle } from "lucide-react";
import React from "react";
import { Badge } from "~/components/ui/badge";

export type LastPostsSimplified = {
  id: string;
  author: string;
  status: string;
  resource: string;
  date: Date;
};

type RecentActivitiesProps = {
  data: LastPostsSimplified[];
};
export const RecentActivities: React.FC<Readonly<RecentActivitiesProps>> = ({
  data,
}) => {
  const config = {
    pending: {
      icon: <Clock color="orange" />,
      color: "border-orange-300",
      label: "Pendente",
    },
    approved: {
      icon: <CheckCircle color="green" />,
      color: "border-green-500",
      label: "Aprovado",
    },
    rejected: {
      icon: <XCircle color="red" />,
      color: "border-red-500",
      label: "Rejeitado",
    },
  };

  return (
    <div className="max-h-[400px] space-y-4 overflow-y-auto">
      {data.map((act) => (
        <div
          key={act.id}
          className={`flex items-center rounded border-2 ${config[act.status as keyof typeof config].color} px-2 py-4`}
        >
          <div>{config[act.status as keyof typeof config].icon}</div>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{act.author}</p>
            <Badge variant={"outline"}>
              {config[act.status as keyof typeof config].label}
            </Badge>
          </div>
          <div className="ml-auto">
            <p className="text-md font-bold">{act.resource}</p>
            <span className="text-xs text-gray-500">
              {act.date.toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
