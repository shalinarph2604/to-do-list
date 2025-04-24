# Build stage
FROM node:jod-slim AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# Production stage
FROM node:jod-slim AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /app/out ./out

CMD ["node", "out/app.js"]
