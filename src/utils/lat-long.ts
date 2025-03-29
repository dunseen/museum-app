export function decimalToDMS(degree: number, isLat: boolean): string {
  const absolute = Math.abs(degree);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);

  const direction = degree >= 0 ? (isLat ? "N" : "E") : isLat ? "S" : "W";

  return `${degrees}°${minutes}'${seconds}"${direction}`;
}
