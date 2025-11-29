import { decimalToDMS } from "~/utils/lat-long";

/**
 * Formats state object to display code
 */
export function formatState(val: unknown): string {
  if (!val || typeof val !== "object") return "-";
  return (val as { code?: string }).code ?? "-";
}

/**
 * Formats city object to display name
 */
export function formatCity(val: unknown): string {
  if (!val || typeof val !== "object") return "-";
  return (val as { name?: string }).name ?? "-";
}

/**
 * Formats latitude to DMS format
 */
export function formatLatitude(val: unknown): string {
  if (val == null) return "-";
  if (typeof val === "number" || typeof val === "string") {
    return decimalToDMS(String(val), true);
  }
  return "-";
}

/**
 * Formats longitude to DMS format
 */
export function formatLongitude(val: unknown): string {
  if (val == null) return "-";
  if (typeof val === "number" || typeof val === "string") {
    return decimalToDMS(String(val), false);
  }
  return "-";
}
