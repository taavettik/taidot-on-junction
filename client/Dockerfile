FROM  --platform=linux/amd64 node:lts-alpine

WORKDIR /service

COPY ./package*.json ./

EXPOSE 8080

CMD npm i && npm start