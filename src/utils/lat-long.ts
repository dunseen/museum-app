export function decimalToDMS(degree: string, isLat: boolean): string {
  const absolute = Math.abs(Number(degree));
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);

  const direction =
    Number(degree) >= 0 ? (isLat ? "N" : "E") : isLat ? "S" : "W";

  return `${degrees}°${minutes}'${seconds}"${direction}`;
}
