export function isTokenExpired(exp?: number) {
  if (!exp) {
    return true;
  }
  return exp < Date.now();
}
