"use client";

import { DataTable } from "../../../shared/components/data-table";
import { useCallback, useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { ActivitiesHeader } from "../components/activities-header";

import { ActivitiesTableActions } from "../components/activities-table-actions";
import RejectActivityDialog from "../components/reject-activity-dialog";
import { useDisclosure } from "~/hooks/use-disclosure";
import { ConfirmationAlert } from "../../../shared/components/confirmation-alert";
import { useDebouncedInput } from "~/hooks/use-debounced-input";
import {
  type DraftWithChangeRequest,
  useGetChangeRequests,
  getChangeRequestDetailConfig,
  useApproveChangeRequest,
  useRejectChangeRequest,
} from "../../api";
import type {
  ChangeRequestAction,
  ChangeRequestStatus,
} from "../../api/useGetChangeRequests";
import { toast } from "sonner";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { type GetCharacteristicDraftDetailApiResponse } from "../../types/change-request-detail.types";
import { useQueryClient } from "@tanstack/react-query";
import { EntityType } from "~/types";
import { ChangeRequestDetailDialog } from "./change-request-detail-dialog";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utils";

const STATUS_PARSER: Record<ChangeRequestStatus, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
  withdrawn: "Retirado",
};

const STATUS_BADGE_STYLES: Record<ChangeRequestStatus, string> = {
  pending:
    "bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200",
  approved:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200",
  rejected:
    "bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-200",
  withdrawn:
    "bg-slate-100 text-slate-900 dark:bg-slate-900/40 dark:text-slate-200",
};

const ACTION_PARSER: Record<ChangeRequestAction, string> = {
  create: "Criação",
  update: "Atualização",
  delete: "Remoção",
};

const ACTION_BADGE_STYLES: Record<ChangeRequestAction, string> = {
  create:
    "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-200",
  update:
    "bg-sky-100 text-sky-900 dark:bg-sky-900/40 dark:text-sky-200",
  delete:
    "bg-rose-100 text-rose-900 dark:bg-rose-900/40 dark:text-rose-200",
};

type ViewedDetail =
  | { entityType: typeof EntityType.SPECIE; data: GetSpecieApiResponse }
  | {
      entityType: typeof EntityType.CHARACTERISTIC;
      data: GetCharacteristicDraftDetailApiResponse;
    };

export default function System() {
  const [selectedCrId, setSelectedCrId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<
    ChangeRequestStatus | undefined
  >(undefined);
  const [actionFilter, setActionFilter] = useState<
    ChangeRequestAction | undefined
  >(undefined);

  const lastPostHook = useDebouncedInput();

  const draftsQuery = useGetChangeRequests({
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

  const queryClient = useQueryClient();

  const [viewedDetail, setViewedDetail] = useState<ViewedDetail | null>(null);
  const [selectedChangeRequest, setSelectedChangeRequest] =
    useState<DraftWithChangeRequest | null>(null);

  const handleReject = useCallback(
    (cr: DraftWithChangeRequest) => {
      setSelectedCrId(cr.changeRequest.id);
      rejectDialog.onOpen();
    },
    [rejectDialog],
  );
  const handleApprove = useCallback(
    (cr: DraftWithChangeRequest) => {
      setSelectedCrId(cr.changeRequest.id);
      approveDialog.onOpen();
    },
    [approveDialog],
  );

  const viewDataActivity = useCallback(
    async (cr: DraftWithChangeRequest) => {
      if (
        cr.entityType !== EntityType.SPECIE &&
        cr.entityType !== EntityType.CHARACTERISTIC
      ) {
        toast.error("Visualização não suportada para este tipo de entidade");
        return;
      }

      try {
        const detail = await queryClient.fetchQuery(
          getChangeRequestDetailConfig(cr.id, cr.entityType),
        );

        if (cr.entityType === EntityType.SPECIE) {
          setViewedDetail({
            entityType: EntityType.SPECIE,
            data: detail as GetSpecieApiResponse,
          });
        } else {
          setViewedDetail({
            entityType: EntityType.CHARACTERISTIC,
            data: detail as GetCharacteristicDraftDetailApiResponse,
          });
        }

        setSelectedChangeRequest(cr);
        addDialog.onOpen();
      } catch (e) {
        console.error(e);
        toast.error("Erro ao carregar detalhes da entidade");
      }
    },
    [addDialog, queryClient],
  );

  const columns = useMemo<ColumnDef<DraftWithChangeRequest>[]>(
    () => [
      {
        header: "Nome",
        accessorKey: "entityName",
        cell: ({ row }) => (
          <span className="max-w-96 truncate">{row.original.entityName}</span>
        ),
      },
      {
        header: "Recurso",
        accessorKey: "entityType",
        cell: ({ row }) => {
          const typeLabels: Record<string, string> = {
            [EntityType.SPECIE]: "Espécie",
            [EntityType.CHARACTERISTIC]: "Característica",
            [EntityType.TAXON]: "Taxonomia",
          };
          return typeLabels[row.original.entityType] ?? row.original.entityType;
        },
      },
      {
        header: "Solicitação",
        accessorKey: "action",
        cell: ({ row }) => {
          const action = row.original.changeRequest.action;
          const label = ACTION_PARSER[action] ?? action;
          const style = ACTION_BADGE_STYLES[action] ?? "";
          return (
            <Badge
              variant="outline"
              className={cn(
                "border-transparent px-2 py-0.5 text-xs font-medium",
                style,
              )}
            >
              {label}
            </Badge>
          );
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
          const status = row.original.changeRequest.status;
          const label = STATUS_PARSER[status] ?? status;
          const style = STATUS_BADGE_STYLES[status] ?? "";
          return (
            <Badge
              variant="outline"
              className={cn(
                "border-transparent px-2 py-0.5 text-xs font-medium",
                style,
              )}
            >
              {label}
            </Badge>
          );
        },
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
        header: "Data de Criação",
        accessorKey: "proposedAt",
        cell: ({ row }) =>
          new Date(row.original.changeRequest.proposedAt).toLocaleString(
            "pt-BR",
          ),
      },
      {
        header: "Data de Aprovação",
        accessorKey: "decidedAt",
        cell: ({ row }) =>
          row.original.changeRequest.decidedAt
            ? new Date(row.original.changeRequest.decidedAt).toLocaleString(
                "pt-BR",
              )
            : "-",
      },
      {
        header: "Ações",
        accessorKey: "id",
        cell: ({ row }) => (
          <ActivitiesTableActions
            onApprove={() => handleApprove(row.original)}
            onReject={() => handleReject(row.original)}
            onViewDetails={() => viewDataActivity(row.original)}
            status={row.original.changeRequest.status}
          />
        ),
      },
    ],
    [handleApprove, handleReject, viewDataActivity],
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

  const onCloseAddDialog = () => {
    addDialog.onClose();
    setSelectedCrId(null);
    setViewedDetail(null);
    setSelectedChangeRequest(null);
  };

  return (
    <>
      <ActivitiesHeader
        currentPage={lastPostHook.curentPage}
        totalPages={draftsQuery.data?.pagination?.total ?? 0}
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
        isLoading={draftsQuery.isLoading}
        data={draftsQuery.data?.data ?? []}
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

      {viewedDetail && selectedChangeRequest && (
        <ChangeRequestDetailDialog
          isOpen={addDialog.isOpen}
          onClose={onCloseAddDialog}
          entityType={viewedDetail.entityType}
          data={viewedDetail.data}
          action={selectedChangeRequest.changeRequest.action}
          status={selectedChangeRequest.changeRequest.status}
          proposedBy={selectedChangeRequest.changeRequest.proposedBy}
          proposedAt={selectedChangeRequest.changeRequest.proposedAt}
          reviewedBy={selectedChangeRequest.changeRequest.reviewedBy}
          decidedAt={selectedChangeRequest.changeRequest.decidedAt}
          reviewerNote={selectedChangeRequest.changeRequest.reviewerNote}
        />
      )}
    </>
  );
}
