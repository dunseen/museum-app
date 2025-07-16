# Install dependencies only when needed
FROM node:20.16.0-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Rebuild the source code only when needed
FROM node:20.16.0-alpine AS builder
WORKDIR /app
ENV SKIP_ENV_VALIDATION=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build with environment variables for the client and auth
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

RUN yarn build

# Production image using standalone output
FROM node:20.16.0-alpine AS runner
WORKDIR /app
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_APP_URL
ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

# create a non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -G nodejs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 🔧 Fix permission for .next
RUN mkdir -p /app/.next/cache && chown -R nextjs:nodejs /app/.next

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]
