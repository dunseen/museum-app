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
import {
  useGetChangeRequests,
  useApproveChangeRequest,
  useRejectChangeRequest,
} from "../../api";
import { type SpecieDraftWithChangeRequest } from "../../api/useGetChangeRequests";
import { toast } from "sonner";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { useGeneratePdf } from "../../hooks/useExportPdf";
import { useQueryClient } from "@tanstack/react-query";
import { getSpecieDraftDetailConfig } from "../../api/useGetSpecieDraftDetail";
import type {
  ChangeRequestAction,
  ChangeRequestStatus,
} from "../../api/useGetChangeRequests";

const STATUS_PARSER = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
} as const;

const ACTION_PARSER = {
  create: "Criar",
  update: "Atualizar",
  delete: "Deletar",
} as const;
export default function System() {
  const [selectedCrId, setSelectedCrId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    ChangeRequestStatus | undefined
  >(undefined);
  const [actionFilter, setActionFilter] = useState<
    ChangeRequestAction | undefined
  >(undefined);

  const lastPostHook = useDebouncedInput();

  const changeRequestsQuery = useGetChangeRequests({
    limit: lastPostHook.pageLimit,
    page: lastPostHook.curentPage,
    status: statusFilter,
    action: actionFilter,
    search: lastPostHook.debouncedInput,
  });

  const approveMutation = useApproveChangeRequest();
  const rejectMutation = useRejectChangeRequest();

  const rejectDialog = useDisclosure();
  const approveDialog = useDisclosure();
  const addDialog = useDisclosure();

  const { generatePDF } = useGeneratePdf();
  const queryClient = useQueryClient();

  const [viewedSpecie, setViewedSpecie] = useState<GetSpecieApiResponse | null>(
    null,
  );

  const handleReject = useCallback(
    (cr: SpecieDraftWithChangeRequest) => {
      setSelectedCrId(cr.changeRequest.id);
      rejectDialog.onOpen();
    },
    [rejectDialog],
  );
  const handleApprove = useCallback(
    (cr: SpecieDraftWithChangeRequest) => {
      setSelectedCrId(cr.changeRequest.id);
      approveDialog.onOpen();
    },
    [approveDialog],
  );

  const viewDataActivity = useCallback(
    async (cr: SpecieDraftWithChangeRequest) => {
      try {
        const specie = await queryClient.fetchQuery(
          getSpecieDraftDetailConfig(cr.id),
        );
        setViewedSpecie(specie);
        addDialog.onOpen();
      } catch (e) {
        console.error(e);
        toast.error("Erro ao carregar detalhes da espécie");
      }
    },
    [addDialog, queryClient],
  );

  const onGeneratePDF = useCallback(
    async (cr: SpecieDraftWithChangeRequest) => {
      try {
        const specie = await queryClient.fetchQuery(
          getSpecieDraftDetailConfig(cr.id),
        );
        if (specie) {
          await generatePDF({ specie });
        }
      } catch (e) {
        console.error(e);
        toast.error("Erro ao gerar PDF");
      }
    },
    [generatePDF, queryClient],
  );
  const columns = useMemo<ColumnDef<SpecieDraftWithChangeRequest>[]>(
    () => [
      {
        header: "Espécie",
        accessorKey: "scientificName",
        cell: ({ row }) => (
          <span
            className="cursor-pointer underline"
            onClick={() => viewDataActivity(row.original)}
          >
            {row.original.scientificName}
          </span>
        ),
      },
      {
        header: "Ação",
        accessorKey: "action",
        cell: ({ row }) =>
          ACTION_PARSER[
            row.original.changeRequest.action as keyof typeof ACTION_PARSER
          ],
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) =>
          STATUS_PARSER[
            row.original.changeRequest.status as keyof typeof STATUS_PARSER
          ],
      },
      {
        header: "Autor",
        accessorKey: "author",
        cell: ({ row }) =>
          `${row.original.changeRequest.proposedBy.firstName ?? ""} ${row.original.changeRequest.proposedBy.lastName ?? ""}`,
      },
      {
        header: "Validador",
        accessorKey: "validator",
        cell: ({ row }) => {
          const rv = row.original.changeRequest.reviewedBy;
          if (rv) return `${rv.firstName ?? ""} ${rv.lastName ?? ""}`;
          return "-";
        },
      },
      {
        header: "Comentário",
        accessorKey: "reviewerNote",
        cell: ({ row }) => row.original.changeRequest.reviewerNote ?? "-",
      },
      {
        header: "Data",
        accessorKey: "createdAt",
        cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
      },
      {
        header: "Ações",
        accessorKey: "id",
        cell: ({ row }) => (
          <ActivitiesTableActions
            onApprove={() => handleApprove(row.original)}
            onReject={() => handleReject(row.original)}
            status={row.original.changeRequest.status}
            onGeneratePDF={() => onGeneratePDF(row.original)}
          />
        ),
      },
    ],
    [handleApprove, handleReject, onGeneratePDF, viewDataActivity],
  );

  function onReject(reason: string) {
    if (!selectedCrId) return;
    rejectMutation.mutate(
      { id: selectedCrId, reviewerNote: reason },
      {
        onSuccess() {
          rejectDialog.onClose();
          setSelectedCrId(null);
          toast.success("Solicitação rejeitada com sucesso");
        },
        onError() {
          toast.error("Erro ao rejeitar solicitação");
        },
      },
    );
  }

  function onApprove() {
    if (!selectedCrId) return;
    approveMutation.mutate(selectedCrId, {
      onSuccess() {
        approveDialog.onClose();
        setSelectedCrId(null);
        toast.success("Solicitação aprovada com sucesso");
      },
      onError() {
        toast.error("Erro ao aprovar solicitação");
      },
    });
  }

  function getRowClassName(status: string): string | undefined {
    switch (status) {
      case "approved":
        return "bg-emerald-50 dark:bg-emerald-950/30";
      case "rejected":
        return "bg-rose-50 dark:bg-rose-950/30";
      case "pending":
        return "bg-amber-50/50 dark:bg-amber-950/30";
      case "withdrawn":
        return "bg-slate-50 dark:bg-slate-900/30";
      default:
        return undefined;
    }
  }

  const onCloseAddDialog = () => {
    addDialog.onClose();
    setSelectedCrId(null);
    setViewedSpecie(null);
  };

  return (
    <>
      <ActivitiesHeader
        currentPage={lastPostHook.curentPage}
        totalPages={changeRequestsQuery.data?.pagination?.total ?? 0}
        onPageChange={lastPostHook.setCurrentPage}
        onSearch={lastPostHook.setDebouncedInput}
        status={statusFilter}
        onStatusChange={(s) => setStatusFilter(s)}
        action={actionFilter}
        onActionChange={(a) => setActionFilter(a)}
      />

      <DataTable
        handleViewData={addDialog.onOpen}
        columns={columns}
        isLoading={changeRequestsQuery.isLoading}
        data={changeRequestsQuery.data?.data ?? []}
        getRowClassName={({ original }) => {
          const status = original.changeRequest.status;
          return getRowClassName(status);
        }}
      />

      {rejectDialog.isOpen && (
        <RejectActivityDialog
          isOpen={rejectDialog.isOpen}
          onClose={rejectDialog.onClose}
          onReject={onReject}
          isLoading={rejectMutation.isPending}
        />
      )}

      {approveDialog.isOpen && (
        <ConfirmationAlert
          isOpen={approveDialog.isOpen}
          onCancel={approveDialog.onClose}
          onConfirm={onApprove}
          onClose={approveDialog.onClose}
          isLoading={approveMutation.isPending}
        />
      )}

      <AddSpecieDialog
        dialogActionTitle={"Visualizar"}
        isOpen={addDialog.isOpen}
        onClose={onCloseAddDialog}
        data={viewedSpecie ?? undefined}
        isReadOnly
      />
    </>
  );
}
