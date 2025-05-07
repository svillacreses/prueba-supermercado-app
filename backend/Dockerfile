# Etapa 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar solo lo necesario para instalar y compilar en dev
COPY package.json package-lock.json ./
RUN npm install

COPY tsconfig.json ./
# No copiamos porque estamos en desarrollo
# COPY src ./src

# Compilar TypeScript
# RUN npm run build

CMD ["npm", "run", "dev"]
