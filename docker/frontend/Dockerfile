FROM node:18-alpine as install

RUN npm i -g pnpm

WORKDIR /app

COPY frontend/package.json ./

RUN pnpm -F frontend install

FROM install as build

WORKDIR /app

COPY --from=install /app/node_modules/ ./node_modules

COPY frontend/ ./

RUN pnpm -F frontend build

FROM build as deploy

WORKDIR /app

COPY --from=build /app ./

CMD ["pnpm", "-F", "frontend", "run", "host"]