FROM node:18.16.0-alpine3.18

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

EXPOSE 3000 

CMD ["npm", "start"]
