# syntax=docker/dockerfile:1

FROM node:22-alpine AS dependencies
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate
COPY apps/web/package.json apps/web/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS build
COPY apps/web/ ./
RUN pnpm build && pnpm prune --prod

FROM node:22-alpine AS runtime
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
RUN addgroup -S lupa && adduser -S lupa -G lupa
COPY --from=build --chown=lupa:lupa /app/dist ./dist
COPY --from=build --chown=lupa:lupa /app/node_modules ./node_modules
USER lupa
EXPOSE 3000
CMD ["node", "dist/index.js"]
