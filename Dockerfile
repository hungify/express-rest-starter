# Common build stage
FROM node:16.15.0-alpine as base-build-stage

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm i

EXPOSE 8000

# Development build stage
FROM base-build-stage as development-build-stage

ENV NODE_ENV development

CMD ["npm", "run", "dev"]

# Production build stage
FROM base-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
