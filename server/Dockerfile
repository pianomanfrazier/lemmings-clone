FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

# this assumes you have already compiled the scss and hbs files
COPY . .

EXPOSE 3000

CMD ["npm", "start"]

