FROM node:latest

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install
RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start:dev"]