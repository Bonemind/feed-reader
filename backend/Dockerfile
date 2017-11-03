FROM node:9-alpine


RUN mkdir /app
COPY ./* /app/
COPY ./config.example.json /app/config.json

WORKDIR /app

RUN npm install

CMD ["node", "index.js"]
