import { DataTable } from "../../shared/components/data-table";
import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { LastActivity } from "./types";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { ActivitiesHeader } from "./components/activities-header";

const fakerUser = Array.from({ length: 50 }, () => ({
  id: faker.string.uuid(),
  validator: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  },
  author: {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
  },
  date: faker.date.recent().toLocaleDateString(),
  resource: faker.food.fruit(),
  status:
    ["approved", "rejected", "pending"][Math.floor(Math.random() * 3)] ??
    "pending",
}));

export default function Page() {
  const columns = useMemo<ColumnDef<LastActivity>[]>(
    () => [
      {
        header: "Espécie",
        accessorKey: "resource",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Autor",
        accessorKey: "author.name",
      },
      {
        header: "Validador",
        accessorKey: "validator.name",
      },
      {
        header: "Data",
        accessorKey: "date",
      },
    ],
    [],
  );

  return (
    <>
      <ActivitiesHeader />

      <DataTable columns={columns} data={fakerUser} />
    </>
  );
}
