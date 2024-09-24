FROM node:18

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN npm run build

# Bundle app source
COPY . .

EXPOSE 3000
RUN chown -R node /usr/src/app
CMD [ "npm", "start" ]