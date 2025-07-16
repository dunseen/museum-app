/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["geist"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "herb-storage-api.dlima-consulting.com",
      },
    ],
  },
};

export default config;
