/**
 * Formats taxonomy values for display
 */
export function formatTaxonomy(val: unknown): string {
  if (!val) return '-';

  if (Array.isArray(val)) {
    return val.map((t: { name: string }) => t.name).join(', ');
  }

  if (typeof val === 'object' && val !== null && 'name' in val) {
    return (val as { name: string }).name ?? '-';
  }

  if (typeof val === 'string' || typeof val === 'number') {
    return String(val);
  }

  return '-';
}
