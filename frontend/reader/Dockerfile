FROM node:9-alpine as builder
RUN mkdir /reader-ui
WORKDIR /reader-ui
COPY ./ ./
RUN npm install
RUN ./node_modules/.bin/preact build -p --no-prerender



FROM zzswang/docker-nginx-react
COPY --from=builder /reader-ui/build /app/
