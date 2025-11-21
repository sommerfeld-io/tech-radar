FROM node:25.2.1-alpine3.22 AS build
LABEL maintainer="sebastian@sommerfeld.io"

COPY package.json /src/package.json
COPY package-lock.json /src/package-lock.json
COPY radar /src/radar

WORKDIR /src

RUN npm install \
    && npm run build:radar

FROM nginx:1.29.3-alpine3.22 AS run
LABEL maintainer="sebastian@sommerfeld.io"

COPY --from=build /src/radar/public /usr/share/nginx/html
