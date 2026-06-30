FROM node:20-alpine AS builder
WORKDIR /app

# 1. Define o argumento de entrada
ARG VITE_API_URL
# 2. Transforma em variável de ambiente para o build do Vite enxergar
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci
COPY . .
# 3. O Vite vai pegar o valor de ENV VITE_API_URL e embutir no JS
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]   