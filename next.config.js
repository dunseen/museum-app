// Content Security Policy configuration
const CSP_SOURCES = {
  default: ["'self'"],
  script: [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    "https://static.cloudflareinsights.com",
  ],
  style: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  img: [
    "'self'",
    "data:",
    "blob:",
    "https://museum.dlima-consulting.com/storage/*",
    "https://*.tile.openstreetmap.org",
    "http://127.0.0.1:9000",
    "http://localhost:9000",
  ],
  font: ["'self'", "https://fonts.gstatic.com"],
  connect: [
    "'self'",
    "https://*.tile.openstreetmap.org",
    "https://museum.dlima-consulting.com/api/*",
    "https://museum.dlima-consulting.com/storage/*",
    "https://cloudflareinsights.com",
    "https://faro-collector-prod-sa-east-1.grafana.net", // Grafana Faro
    "http://127.0.0.1:9000",
    "http://localhost:9000",
    "http://localhost:3333",
    "http://127.0.0.1:3333",
  ],
  media: ["'self'"],
  object: ["'none'"],
};

const contentSecurityPolicy = [
  `default-src ${CSP_SOURCES.default.join(" ")}`,
  `script-src ${CSP_SOURCES.script.join(" ")}`,
  `style-src ${CSP_SOURCES.style.join(" ")}`,
  `img-src ${CSP_SOURCES.img.join(" ")}`,
  `font-src ${CSP_SOURCES.font.join(" ")}`,
  `connect-src ${CSP_SOURCES.connect.join(" ")}`,
  `media-src ${CSP_SOURCES.media.join(" ")}`,
  `object-src ${CSP_SOURCES.object.join(" ")}`,
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["geist"],
  // Allow skipping type/lint checks during `next build` when building inside a container.
  // Set the build-time arg `SKIP_NEXT_CHECKS=true` (or `--build-arg SKIP_NEXT_CHECKS=true`) to enable.
  // By default (when SKIP_NEXT_CHECKS is not set or false) the checks remain enabled.
  typescript: {
    ignoreBuildErrors:
      !!process.env.SKIP_NEXT_CHECKS,
  },
  eslint: {
    ignoreDuringBuilds:
      !!process.env.SKIP_NEXT_CHECKS,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/museu/herbario",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "herb-storage-api.dlima-consulting.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "9000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
    ],
  },
};

export default config;
