import { z } from "zod";

const ServerEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("production"),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url().optional(),
});

/**
 * Validate once and cache forever.
 */
let cached: z.infer<typeof ServerEnvSchema> | null = null;

export function serverEnv() {
  if (!cached) {
    const parsed = ServerEnvSchema.safeParse(process.env);
    if (!parsed.success) {
      console.error("❌ Invalid server env:", parsed.error.format());
      throw new Error("Invalid server environment variables");
    }
    cached = parsed.data;
  }
  return cached;
}
