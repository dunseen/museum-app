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

export function DMSToDecimal(dms: string): string {
  const regex = /(\d{1,3})°(\d{1,2})'(\d+(?:\.\d+)?)\"([NSEW])/i;
  const match = regex.exec(dms.trim());
  if (!match) return "";
  const degrees = parseFloat(match[1]);
  const minutes = parseFloat(match[2]);
  const seconds = parseFloat(match[3]);
  const direction = match[4].toUpperCase();
  let decimal = degrees + minutes / 60 + seconds / 3600;
  if (direction === "S" || direction === "W") {
    decimal = -decimal;
  }
  return decimal.toString();
}

