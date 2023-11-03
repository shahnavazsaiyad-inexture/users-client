FROM node:20-alpine
WORKDIR /users-client/
COPY public /users-client/public
COPY src /users-client/src
COPY package.json /users-client/package.json
RUN npm install
CMD [ "npm", "start" ]