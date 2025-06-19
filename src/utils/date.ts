export function formatDate(
  date: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "UTC",
    ...options,
  }).format(new Date(date));
}
