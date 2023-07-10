 FROM node:18.16.0

 WORKDIR /app

 COPY package*.json ./
 
 COPY . .

 RUN yarn

 RUN touch .env & cp .env.example .env

 RUN npx prisma generate

 EXPOSE 4000

 CMD [ "yarn", "dev" ]

