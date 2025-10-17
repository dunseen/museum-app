import type { SpecieStatus } from "~/app/museu/herbario/types/specie.types";

export const SPECIE_STATUS_LABELS: Record<SpecieStatus, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitada",
  withdrawn: "Retirada",
};

export const SPECIE_STATUS_BADGE_VARIANTS: Record<
  SpecieStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
  withdrawn: "outline",
};

export const SPECIE_STATUS_ROW_CLASSNAME: Record<SpecieStatus, string> = {
  approved: "bg-emerald-50 dark:bg-emerald-950/30",
  rejected: "bg-rose-50 dark:bg-rose-950/30",
  pending: "bg-amber-50/50 dark:bg-amber-950/30",
  withdrawn: "bg-slate-50 dark:bg-slate-900/30",
};
