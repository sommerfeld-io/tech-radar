FROM node:25.2.1-alpine3.22 AS build
LABEL maintainer="sebastian@sommerfeld.io"

COPY package.json /src/package.json
COPY package-lock.json /src/package-lock.json
COPY radar /src/radar

WORKDIR /src

RUN npm install --production \
    && npm run build:radar

# -----------------------------------------------------------------------------

FROM nginx:1.29.3-alpine3.22 AS run
LABEL maintainer="sebastian@sommerfeld.io"

COPY --from=build /src/radar/public /usr/share/nginx/html

# -----------------------------------------------------------------------------

FROM node:25.2.1-alpine3.22 AS yaml2json
LABEL maintainer="sebastian@sommerfeld.io"

COPY --from=build /src/package.json /src/package.json
COPY --from=build /src/package-lock.json /src/package-lock.json
COPY --from=build /src/node_modules /src/node_modules
COPY --from=build /src/radar/build.js /src/radar/build.js

WORKDIR /src

ENTRYPOINT ["node", "radar/build.js"]
