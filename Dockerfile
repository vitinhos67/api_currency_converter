FROM node:14-alpine

WORKDIR /app


COPY package*.json tsconfig.json .env ./
COPY src ./src

RUN npm install


RUN npm run build


EXPOSE 3000

CMD [ "npm", "start" ]