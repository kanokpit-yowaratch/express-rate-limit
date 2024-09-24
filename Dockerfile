FROM node:18

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN npm run build

#COPY . .

EXPOSE 3000
RUN chown -R node /usr/src/app
CMD [ "npm", "start" ]