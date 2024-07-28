FROM node:16
WORKDIR /app

COPY ./ .

RUN npm install -g npm@6.14.15
RUN npm install

CMD [ "npm", "run", "start:dev" ]
