# first stage
FROM node:16 AS base
WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV CI=true
RUN [ "npm", "run", "test" ]

# second stage
FROM base as build-stage
RUN npm i serve

# ENV REACT_APP_BACKEND_URL=http://localhost:3001
RUN npm run build

CMD ["npx", "serve", "./build", "-l", "3000"]

# # third stage
# # This is a new stage, everything before this is gone, except the files we want to COPY
# FROM nginx:1.20-alpine
# # COPY the directory build from build-stage to /usr/share/nginx/html
# # The target location here was found from the Docker hub page
# COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html