# Install dependencies of backend
FROM node:18-alpine as dependencies

# Install pnpm to workspace handle
RUN npm i -g pnpm ts-node

WORKDIR /app

# Copy node config sources
COPY  backend/package.json ./
COPY  backend/tsconfig.json ./
COPY  pnpm-lock.yaml ./

# Install dependencies from package.json
RUN pnpm -F backend install

COPY backend/prisma ./prisma

# Generate Prisma client
RUN npx prisma generate --schema=./prisma/schema.prisma

# Build application
FROM dependencies as build

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

ARG DATABASE_URL=""
ENV DATABASE_URL $DATABASE_URL
ARG NODE_ENV=""
ENV NODE_ENV $NODE_ENV

COPY backend ./

# Build application (produces dist/ folder)
RUN pnpm -F backend build
RUN pnpm prune --prod

# Deploy the application
FROM build as Deploy

WORKDIR /app

COPY --from=build /app/dist/ ./dist/

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma/ ./prisma/

# Expose application port
EXPOSE 8000

# Start application with wait-for-it.sh to wait for the database
CMD ["node", "dist/src/main.js"]