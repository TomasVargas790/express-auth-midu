# ./app/Dockerfile
FROM node:22-alpine

# 1️⃣  Archivos de dependencias
WORKDIR /usr/src/app
COPY package*.json ./

# Instala dependencias de producción (npm ci es reproducible)
RUN npm ci --omit=dev        # o  RUN npm install --omit=dev

# 2️⃣  Copiamos el código fuente
COPY . .

RUN npx tsc -p tsconfig.json

# 3️⃣  Puerto expuesto
EXPOSE 3000

# 4️⃣  Comando de arranque
CMD ["npm", "start"]