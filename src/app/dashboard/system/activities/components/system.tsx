"use client";

import { DataTable } from "../../../shared/components/data-table";
import { useCallback, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { ActivitiesHeader } from "../components/activities-header";

import { ActivitiesTableActions } from "../components/activities-table-actions";
import RejectActivityDialog from "../components/reject-activity-dialog";
import { useDisclosure } from "~/hooks/use-disclosure";
import { ConfirmationAlert } from "../../../shared/components/confirmation-alert";
import { AddSpecieDialog } from "../../../collection/species/add/add-specie-dialog";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import { useGetLastPosts, usePostValidation } from "../../api";
import { type GetPostDetailsApiResponse } from "~/app/museu/herbario/types/post.types";
import { toast } from "sonner";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { useGeneratePdf } from "../../hooks/useExportPdf";

const STATUS_PARSER = {
  pending: "Pendente",
  published: "Publicado",
  rejected: "Rejeitado",
};
export default function System() {
  const lastPostHook = useDebouncedInput();

  const lastPostsQuery = useGetLastPosts({
    limit: lastPostHook.pageLimit,
    page: lastPostHook.curentPage,
    name: lastPostHook.debouncedInput,
  });

  const postValidationMutation = usePostValidation();

  const rejectDialog = useDisclosure();
  const approveDialog = useDisclosure();
  const addDialog = useDisclosure();

  const { generatePDF } = useGeneratePdf();

  const [selectedActivity, setSelectedActivity] =
    useState<GetPostDetailsApiResponse | null>(null);
  const [viewSpecie, setViewSpecie] = useState<GetSpecieApiResponse | null>(
    null,
  );

  const handleReject = useCallback(
    (activity: GetPostDetailsApiResponse) => {
      setSelectedActivity(activity);
      rejectDialog.onOpen();
    },
    [rejectDialog],
  );
  const handleApprove = useCallback(
    (activity: GetPostDetailsApiResponse) => {
      setSelectedActivity(activity);
      approveDialog.onOpen();
    },
    [approveDialog],
  );

  const viewDataActivity = useCallback(
    (specie: GetSpecieApiResponse): void => {
      setViewSpecie(specie);
      addDialog.onOpen();
    },
    [addDialog],
  );

  const columns = useMemo<ColumnDef<GetPostDetailsApiResponse>[]>(
    () => [
      {
        header: "Espécie",
        accessorKey: "specie",
        cell: ({ row }) => (
          <span
            className="cursor-pointer underline"
            onClick={() => viewDataActivity(row.original.specie)}
          >
            {row.original.specie.scientificName}
          </span>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) =>
          STATUS_PARSER[row.original.status as keyof typeof STATUS_PARSER],
      },
      {
        header: "Autor",
        accessorKey: "author",
        cell: ({ row }) =>
          `${row.original.author.firstName} ${row.original.author.lastName}`,
      },
      {
        header: "Validador",
        accessorKey: "validator",
        cell: ({ row }) => {
          if (row.original.validator) {
            return `${row.original.validator.firstName} ${row.original.validator.lastName}`;
          }
          return "-";
        },
      },
      {
        header: "Comentário",
        accessorKey: "rejectReason",
      },
      {
        header: "Data",
        accessorKey: "updatedAt",
        cell: ({ row }) => new Date(row.original.updatedAt).toLocaleString(),
      },
      {
        header: "Ações",
        accessorKey: "id",
        cell: ({ row }) => (
          <ActivitiesTableActions
            onApprove={() => handleApprove(row.original)}
            onReject={() => handleReject(row.original)}
            onGeneratePDF={() => generatePDF({ post: row.original })}
            isPublished={row.original.status === "published"}
          />
        ),
      },
    ],
    [generatePDF, handleApprove, handleReject, viewDataActivity],
  );

  function onReject(reason: string) {
    postValidationMutation.mutate(
      {
        id: String(selectedActivity?.id),
        rejectReason: reason,
      },
      {
        onSuccess() {
          rejectDialog.onClose();
          setSelectedActivity(null);
          toast.success("Publicação rejeitada com sucesso");
        },
        onError() {
          toast.error("Erro ao rejeitar publicação");
        },
      },
    );
  }

  function onApprove() {
    postValidationMutation.mutate(
      {
        id: String(selectedActivity?.id),
      },
      {
        onSuccess() {
          approveDialog.onClose();
          setSelectedActivity(null);
          toast.success("Publicação aprovada com sucesso");
        },
        onError() {
          toast.error("Erro ao aprovar publicação");
        },
      },
    );
  }

  const onCloseAddDialog = () => {
    addDialog.onClose();
    setViewSpecie(null);
  };

  return (
    <>
      <ActivitiesHeader
        currentPage={lastPostHook.curentPage}
        totalPages={lastPostsQuery.data?.pagination?.total ?? 0}
        onPageChange={lastPostHook.setCurrentPage}
        onSearch={lastPostHook.onInputChange}
      />

      <DataTable
        handleViewData={addDialog.onOpen}
        columns={columns}
        isLoading={lastPostsQuery.isLoading}
        data={lastPostsQuery.data?.data ?? []}
      />

      {rejectDialog.isOpen && (
        <RejectActivityDialog
          isOpen={rejectDialog.isOpen}
          onClose={rejectDialog.onClose}
          onReject={onReject}
          isLoading={postValidationMutation.isPending}
        />
      )}

      {approveDialog.isOpen && (
        <ConfirmationAlert
          isOpen={approveDialog.isOpen}
          onCancel={approveDialog.onClose}
          onConfirm={onApprove}
          onClose={approveDialog.onClose}
          isLoading={postValidationMutation.isPending}
        />
      )}

      <AddSpecieDialog
        dialogActionTitle={"Visualizar"}
        isOpen={addDialog.isOpen}
        onClose={onCloseAddDialog}
        data={viewSpecie}
        isReadOnly
      />
    </>
  );
}
