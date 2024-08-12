FROM node:20-alpine AS builder

WORKDIR /app

COPY public public
COPY src src
COPY next-env.d.ts .
COPY next.config.mjs .
COPY package-lock.json .
COPY package.json .
COPY postcss.config.mjs .
COPY tailwind.config.ts .
COPY tsconfig.json .

RUN npm config set registry https://registry.npmmirror.com/
RUN npm install
RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/public public
COPY --from=builder /app/package.json .

ENTRYPOINT ["npm", "start"]
