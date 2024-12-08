# Backend dockerfile
FROM node:14.15.4-alpine3.12

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .

ENV PORT=3001
ENV DEFAULT_ROUTE=/api

EXPOSE 3001
CMD ["npm", "start"]