# ---- Frontend: React (Vite) + Node 22 ----
FROM node:22-alpine AS frontend

WORKDIR /app

# Instalar dependencias primero (cache de Docker layers)
COPY package.json package-lock.json* ./
RUN npm install

# Copiar código fuente
COPY . .

EXPOSE 5173

# Vite dev server con host 0.0.0.0 para acceso desde fuera del container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
