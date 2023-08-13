FROM node:16.15.1-alpine

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

EXPOSE 3000 

CMD ["npm", "start"]
