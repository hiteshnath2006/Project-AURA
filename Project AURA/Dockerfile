# Stage 1: Build Frontend
FROM node:22-alpine AS build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve Backend & Frontend
FROM node:22-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./
COPY --from=build /app/frontend/dist ./public

ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
