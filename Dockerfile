FROM node:boron

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm","start"]