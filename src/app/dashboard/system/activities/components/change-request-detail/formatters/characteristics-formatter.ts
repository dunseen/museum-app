/**
 * Formats characteristics array for display
 */
export function formatCharacteristics(val: unknown): string {
  if (!val) return '-';

  if (Array.isArray(val)) {
    return val.map((c: { name: string }) => c.name).join(', ');
  }

  if (typeof val === 'string') {
    return val;
  }

  return '-';
}
