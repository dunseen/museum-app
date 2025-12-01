# Install dependencies only when needed
FROM node:20-slim AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --prefer-offline && yarn cache clean

# Rebuild the source code only when needed
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build with environment variables for the client and auth
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV

# Build-time flag to skip Next.js type/lint checks during the image build.
# Pass `--build-arg SKIP_NEXT_CHECKS=true` to enable skipping only inside the image.
ARG SKIP_NEXT_CHECKS=false
ENV SKIP_NEXT_CHECKS=${SKIP_NEXT_CHECKS}

RUN yarn build

# Production image using standalone output
FROM node:20-slim AS runner
WORKDIR /app

# Install required system libs
RUN apt-get update && apt-get install -y \
  libc6 \
  libstdc++6 \
  curl \
  wget \
  procps \
  && rm -rf /var/lib/apt/lists/*

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_ENV=$NEXT_PUBLIC_ENV
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# create a non-root user
RUN groupadd -g 1001 nodejs && useradd -m -u 1001 -g nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 🔧 Fix permission for .next
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app/.next

USER nextjs

CMD ["sh", "-c", "exec node server.js --port \"$PORT\" --hostname \"$HOST\""]
