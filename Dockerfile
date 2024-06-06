FROM node:21.7.3-alpine3.20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm","run", "dev"]

EXPOSE 3000


