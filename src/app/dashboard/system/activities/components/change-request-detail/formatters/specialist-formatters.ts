/**
 * Formats specialist object to display name
 */
export function formatSpecialist(val: unknown): string {
  if (!val || typeof val !== "object") return "-";
  return (val as { name?: string }).name ?? "-";
}

/**
 * Formats date to Brazilian locale
 */
export function formatDate(val: unknown): string {
  if (!val) return "-";
  if (typeof val === "string" || typeof val === "number" || val instanceof Date) {
    return new Date(val).toLocaleDateString("pt-BR");
  }
  return "-";
}
