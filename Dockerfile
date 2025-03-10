# Common build stage
FROM node:16.17-alpine as common-build-stage

COPY . ./recruitment-app

WORKDIR /recruitment-app

RUN npm install

EXPOSE 80

# Development build stage
# FROM common-build-stage as development-build-stage

# ENV NODE_ENV development

# CMD ["npm", "run", "dev"]

# Production build stage
FROM common-build-stage as production-build-stage

ENV NODE_ENV production

CMD ["npm", "run", "start"]
