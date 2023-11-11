FROM node:lts-alpine

WORKDIR /service

COPY ./package*.json ./

RUN npm ci

EXPOSE 8080

CMD npm i && npm start