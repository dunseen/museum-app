/**
 * Build-time env validation for public variables.
 * 
 * These are baked into the Next.js client bundle.
 * They DO NOT support runtime overrides.
 */

export const env = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL!,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV ?? "production",
  NEXT_PUBLIC_FARO_COLLECTOR_URL: process.env.NEXT_PUBLIC_FARO_COLLECTOR_URL,
};

// Optional: a tiny sanity check
if (!env.NEXT_PUBLIC_APP_URL) {
  throw new Error("Missing NEXT_PUBLIC_APP_URL at build time");
}
