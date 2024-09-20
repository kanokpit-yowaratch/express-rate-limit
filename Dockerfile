# FROM node:boron
FROM node:16-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm","start"]