"use client";

import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Badge } from "~/components/ui/badge";
import { EntityType } from "~/types";
import {
  type PersonName,
  type GetCharacteristicDraftDetailApiResponse,
  type GetTaxonDraftDetailApiResponse,
} from "../../types/change-request-detail.types";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { formatFullName } from "./change-request-detail/utils";
import { SpecieChangeRequestContent } from "./change-request-detail/specie-change-request-content";
import { CharacteristicChangeRequestContent } from "./change-request-detail/characteristic-change-request-content";
import { TaxonChangeRequestContent } from "./change-request-detail/taxon-change-request-content";
import { ReviewDetails } from "./change-request-detail/review-details";

type BaseProps = {
  isOpen: boolean;
  onClose: () => void;
  action: "create" | "update" | "delete";
  status: string;
  proposedBy: PersonName;
  proposedAt: string;
  reviewedBy?: PersonName | null;
  decidedAt?: string | null;
  reviewerNote?: string | null;
};

type SupportedEntityType =
  | typeof EntityType.SPECIE
  | typeof EntityType.CHARACTERISTIC
  | typeof EntityType.TAXON;

export type ChangeRequestDetailDialogProps = BaseProps & {
  entityType: SupportedEntityType;
  data:
    | GetSpecieApiResponse
    | GetCharacteristicDraftDetailApiResponse
    | GetTaxonDraftDetailApiResponse;
};

const ACTION_LABELS = {
  create: "Criação",
  update: "Atualização",
  delete: "Remoção",
} as const;

const STATUS_LABELS = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
  withdrawn: "Retirado",
} as const;

/**
 * Dialog to display change request details for multiple entity types.
 */
export function ChangeRequestDetailDialog(
  props: ChangeRequestDetailDialogProps,
): React.JSX.Element {
  const {
    isOpen,
    onClose,
    action,
    status,
    proposedBy,
    proposedAt,
    reviewedBy,
    decidedAt,
    reviewerNote,
  } = props;

  const statusLabel =
    STATUS_LABELS[status as keyof typeof STATUS_LABELS] ?? status;
  const actionLabel = ACTION_LABELS[action];
  const proposerName = formatFullName(proposedBy);
  const proposedDate = new Date(proposedAt).toLocaleString("pt-BR");

  const renderContent = useMemo(() => {
    if (props.entityType === EntityType.SPECIE) {
      return (
        <SpecieChangeRequestContent
          data={props.data as GetSpecieApiResponse}
          action={action}
        />
      );
    } else if (props.entityType === EntityType.CHARACTERISTIC) {
      return (
        <CharacteristicChangeRequestContent
          data={props.data as GetCharacteristicDraftDetailApiResponse}
          action={action}
        />
      );
    } else if (props.entityType === EntityType.TAXON) {
      return (
        <TaxonChangeRequestContent
          data={props.data as GetTaxonDraftDetailApiResponse}
          action={action}
        />
      );
    } else {
      return (
        <p className="pt-4 text-sm text-gray-500 dark:text-gray-400">
          Visualização não suportada para este tipo de entidade.
        </p>
      );
    }
  }, [props.data, props.entityType, action]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        aria-describedby={undefined}
        className="max-h-[calc(100dvh-2rem)] max-w-[900px] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>Detalhes da Solicitação</span>
            <Badge variant={status === "pending" ? "default" : "secondary"}>
              {statusLabel}
            </Badge>
            <Badge variant="outline">{actionLabel}</Badge>
          </DialogTitle>
          <DialogDescription>
            Solicitado por {proposerName} em {proposedDate}
          </DialogDescription>
        </DialogHeader>

        {renderContent}

        {reviewedBy && (
          <ReviewDetails
            reviewedBy={reviewedBy}
            decidedAt={decidedAt}
            reviewerNote={reviewerNote}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
