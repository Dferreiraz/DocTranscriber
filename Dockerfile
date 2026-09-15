FROM node:22-alpine
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY . .

RUN cd frontend && npm run build

WORKDIR /app/backend

EXPOSE 3000

CMD ["node", "src/server.js"]