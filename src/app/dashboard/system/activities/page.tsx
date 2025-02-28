"use client";

import { DataTable } from "../../shared/components/data-table";
import { useCallback, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { LastActivity } from "./types";
import { fakerPT_BR as faker } from "@faker-js/faker";
import { ActivitiesHeader } from "./components/activities-header";

import { ActivitiesTableActions } from "./components/activities-table-actions";
import RejectActivityDialog from "./components/reject-activity-dialog";
import { useDisclosure } from "~/hooks/use-disclosure";
import { ConfirmationAlert } from "../../shared/components/confirmation-alert";
import { AddSpecieDialog } from "../../collection/species/add/add-specie-dialog";

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
  date: faker.date.past().toLocaleDateString(),
  resource: faker.food.fruit(),
  reason: Math.random() > 0.5 ? faker.lorem.sentence() : "-",
  status:
    ["Aprovado", "Rejeitado", "Pendente"][Math.floor(Math.random() * 3)] ??
    "Pendente",
}));

export default function Page() {
  const rejectDialog = useDisclosure();
  const approveDialog = useDisclosure();
  const addDialog = useDisclosure();
  const [selectedActivity, setSelectedActivity] = useState<LastActivity | null>(
    null,
  );
  const [viewSpecie, setViewSpecie] = useState("")

  const handleReject = useCallback(
    (activity: LastActivity) => {
      setSelectedActivity(activity);
      rejectDialog.onOpen();
    },
    [rejectDialog],
  );
  const handleApprove = useCallback(
    (activity: LastActivity) => {
      setSelectedActivity(activity);
      approveDialog.onOpen();
    },
    [approveDialog],
  );

  const viewDataActivity = (name: string):void => {
    setViewSpecie(name)
    addDialog.onOpen()
  }


  const columns = useMemo<ColumnDef<LastActivity>[]>(
    () => [
      {
        header: "Espécie",
        accessorKey: "resource",
        cell: ({ row }) => (
          <span
            className="cursor-pointer underline"
            onClick={() => viewDataActivity(row.original.resource)}
          >
            {row.original.resource}
          </span>
        ),
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
        header: "Comentário",
        accessorKey: "reason",
      },
      {
        header: "Data",
        accessorKey: "date",
      },
      {
        header: "Ações",
        accessorKey: "id",
        cell: ({ row }) => (
          <ActivitiesTableActions
            onApprove={() => handleApprove(row.original)}
            onReject={() => handleReject(row.original)}
          />
        ),
      },
    ],
    [handleApprove, handleReject],
  );

  function onReject(reason: string) {
    console.log("Reject", selectedActivity?.id, reason);
    rejectDialog.onClose();
    setSelectedActivity(null);
  }

  

  const onCloseAddDialog = () => {
    addDialog.onClose();
  };

  return (
    <>
      <ActivitiesHeader />

      <DataTable
        handleViewData={(id: number) => {
          console.log("sexo");
          addDialog.onOpen();
        }}
        columns={columns}
        data={fakerUser}
      />

      {rejectDialog.isOpen && (
        <RejectActivityDialog
          isOpen={rejectDialog.isOpen}
          onClose={rejectDialog.onClose}
          onReject={onReject}
        />
      )}

      {approveDialog.isOpen && (
        <ConfirmationAlert
          isOpen={approveDialog.isOpen}
          onCancel={approveDialog.onClose}
          onConfirm={approveDialog.onClose}
          onClose={approveDialog.onClose}
        />
      )}

      <AddSpecieDialog
        dialogActionTitle={"Visualizar"}
        showDescription={false}
        isOpen={addDialog.isOpen}
        onClose={onCloseAddDialog}
        // data={data}
      />
    </>
  );
}
