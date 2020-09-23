FROM node:14-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./src/ . 

RUN npm install --quiet
RUN npm install nodemon -g --quiet

EXPOSE 9000

CMD nodemon -L --watch . server.js
