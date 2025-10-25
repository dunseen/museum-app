"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { FieldDiff } from "./field-diff";
import { type GetSpecieApiResponse } from "~/app/museu/herbario/types/specie.types";
import { decimalToDMS } from "~/utils/lat-long";
import { Badge } from "~/components/ui/badge";
import { FileIcon, ImageIcon } from "lucide-react";

type ChangeRequestDetailDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  data: GetSpecieApiResponse;
  action: "create" | "update" | "delete";
  status: string;
  proposedBy: { firstName: string | null; lastName: string | null };
  proposedAt: string;
  reviewedBy?: { firstName: string | null; lastName: string | null } | null;
  decidedAt?: string | null;
  reviewerNote?: string | null;
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
 * Dialog to display change request details with accordion sections and diff highlighting
 */
export function ChangeRequestDetailDialog({
  isOpen,
  onClose,
  data,
  action,
  status,
  proposedBy,
  proposedAt,
  reviewedBy,
  decidedAt,
  reviewerNote,
}: ChangeRequestDetailDialogProps) {
  const diff = (data.diff ?? {}) as Record<
    string,
    { to?: unknown; from?: unknown }
  > & {
    files?: {
      added?: Array<{ id: string; url: string; path: string }>;
      removed?: Array<{ id: string; url: string; path: string }>;
    };
  };
  const isUpdate = action === "update";

  // Helper to get old value from diff or current data
  // Diff structure: { fieldName: { from: oldValue, to: newValue } }
  const getOldValue = (path: string, current: unknown): unknown => {
    if (!isUpdate || !diff[path]) return current;

    const diffEntry = diff[path] as
      | { from?: unknown; to?: unknown }
      | undefined;
    if (diffEntry && "from" in diffEntry) {
      return diffEntry.from;
    }

    return current;
  };

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
              {STATUS_LABELS[status as keyof typeof STATUS_LABELS] ?? status}
            </Badge>
            <Badge variant="outline">{ACTION_LABELS[action]}</Badge>
          </DialogTitle>
          <DialogDescription>
            Solicitado por {proposedBy.firstName} {proposedBy.lastName} em{" "}
            {new Date(proposedAt).toLocaleString("pt-BR")}
          </DialogDescription>
        </DialogHeader>

        <Accordion
          type="multiple"
          defaultValue={["general", "location", "specialists"]}
          className="w-full"
        >
          {/* General Information Section */}
          <AccordionItem value="general">
            <AccordionTrigger>Informações Gerais</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <FieldDiff
                  label="Nome Científico"
                  oldValue={getOldValue("scientificName", data.scientificName)}
                  newValue={data.scientificName}
                />

                <FieldDiff
                  label="Nome Popular"
                  oldValue={getOldValue("commonName", data.commonName)}
                  newValue={data.commonName}
                />

                <FieldDiff
                  label="Descrição"
                  oldValue={getOldValue("description", data.description)}
                  newValue={data.description}
                />

                <FieldDiff
                  label="Taxonomia"
                  oldValue={getOldValue("taxons", data.taxons)}
                  newValue={data.taxons}
                  formatValue={(val) => {
                    if (!val) return "-";
                    if (Array.isArray(val)) {
                      return val
                        .map((t: { name: string }) => t.name)
                        .join(", ");
                    }

                    if (typeof val === "object" && "name" in val) {
                      return String(val.name);
                    }

                    return String(val);
                  }}
                />

                <FieldDiff
                  label="Características"
                  oldValue={getOldValue(
                    "characteristics",
                    data.characteristics,
                  )}
                  newValue={data.characteristics}
                  formatValue={(val) => {
                    if (!val) return "-";
                    if (Array.isArray(val)) {
                      return val
                        .map((c: { name: string }) => c.name)
                        .join(", ");
                    }
                    return String(val);
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Location Section */}
          <AccordionItem value="location">
            <AccordionTrigger>Localização</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <FieldDiff
                  label="Estado"
                  oldValue={getOldValue("state", data.location.state)}
                  newValue={data.location.state}
                  formatValue={(val) => {
                    if (!val || typeof val !== "object") return "-";
                    return (val as { code?: string }).code ?? "-";
                  }}
                />

                <FieldDiff
                  label="Cidade"
                  oldValue={getOldValue("city", data.location.city)}
                  newValue={data.location.city}
                  formatValue={(val) => {
                    if (!val || typeof val !== "object") return "-";
                    return (val as { name?: string }).name ?? "-";
                  }}
                />

                <FieldDiff
                  label="Endereço"
                  oldValue={getOldValue(
                    "collectLocation",
                    data.location.address,
                  )}
                  newValue={data.location.address}
                />

                <FieldDiff
                  label="Latitude"
                  oldValue={getOldValue("geoLocation", data.location.lat)}
                  newValue={data.location.lat}
                  formatValue={(val) => {
                    if (typeof val === "number") {
                      return decimalToDMS(String(val), true);
                    }
                    return val == null ? "-" : String(val);
                  }}
                />

                <FieldDiff
                  label="Longitude"
                  oldValue={getOldValue("geoLocation", data.location.long)}
                  newValue={data.location.long}
                  formatValue={(val) => {
                    if (typeof val === "number") {
                      return decimalToDMS(String(val), false);
                    }
                    return val == null ? "-" : String(val);
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Specialists Section */}
          <AccordionItem value="specialists">
            <AccordionTrigger>Especialistas</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <FieldDiff
                  label="Coletor"
                  oldValue={getOldValue("collector", data.collector)}
                  newValue={data.collector}
                  formatValue={(val) => {
                    if (!val || typeof val !== "object") return "-";
                    return (val as { name?: string }).name ?? "-";
                  }}
                />

                <FieldDiff
                  label="Determinador"
                  oldValue={getOldValue("determinator", data.determinator)}
                  newValue={data.determinator}
                  formatValue={(val) => {
                    if (!val || typeof val !== "object") return "-";
                    return (val as { name?: string }).name ?? "-";
                  }}
                />

                <FieldDiff
                  label="Data de Coleta"
                  oldValue={getOldValue("collectedAt", data.collectedAt)}
                  newValue={data.collectedAt}
                  formatValue={(val) => {
                    if (!val) return "-";
                    return new Date(String(val)).toLocaleDateString("pt-BR");
                  }}
                />

                <FieldDiff
                  label="Data de Determinação"
                  oldValue={getOldValue("determinatedAt", data.determinatedAt)}
                  newValue={data.determinatedAt}
                  formatValue={(val) => {
                    if (!val) return "-";
                    return new Date(String(val)).toLocaleDateString("pt-BR");
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Files Section */}
          <AccordionItem value="files">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <FileIcon className="h-4 w-4" />
                Arquivos
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {/* Added Files */}
                {diff.files?.added && diff.files.added.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-green-700 dark:text-green-400">
                      Arquivos Adicionados ({diff.files.added.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {diff.files.added.map(
                        (file: { id: string; url: string; path: string }) => (
                          <a
                            key={file.id}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded border border-green-200 bg-green-50 p-2 transition-colors hover:bg-green-100 dark:border-green-800 dark:bg-green-900/20 dark:hover:bg-green-900/30"
                          >
                            <ImageIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <span className="truncate text-xs text-green-800 dark:text-green-300">
                              {file.path.split("/").pop()}
                            </span>
                          </a>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Removed Files */}
                {diff.files?.removed && diff.files.removed.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-red-700 dark:text-red-400">
                      Arquivos Removidos ({diff.files.removed.length})
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {diff.files.removed.map(
                        (file: { id: string; url: string; path: string }) => (
                          <div
                            key={file.id}
                            className="flex items-center gap-2 rounded border border-red-200 bg-red-50 p-2 line-through dark:border-red-800 dark:bg-red-900/20"
                          >
                            <ImageIcon className="h-4 w-4 text-red-600 dark:text-red-400" />
                            <span className="truncate text-xs text-red-800 dark:text-red-300">
                              {file.path.split("/").pop()}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Current Files (no changes) */}
                {(!diff.files?.added || diff.files.added.length === 0) &&
                  (!diff.files?.removed || diff.files.removed.length === 0) &&
                  data.files &&
                  data.files.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Arquivos ({data.files.length})
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {data.files.map((file) => (
                          <a
                            key={file.id}
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded border p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                          >
                            <ImageIcon className="h-4 w-4" />
                            <span className="truncate text-xs">
                              {file.url.split("/").pop()}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                {(!data.files || data.files.length === 0) &&
                  (!diff.files?.added || diff.files.added.length === 0) &&
                  (!diff.files?.removed || diff.files.removed.length === 0) && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Nenhum arquivo anexado
                    </p>
                  )}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Review Section (if reviewed) */}
          {reviewedBy && (
            <AccordionItem value="review">
              <AccordionTrigger>Revisão</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Revisor
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {reviewedBy.firstName} {reviewedBy.lastName}
                    </p>
                  </div>
                  {decidedAt && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Data da Decisão
                      </label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(decidedAt).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  )}
                  {reviewerNote && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Comentário
                      </label>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {reviewerNote}
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}
