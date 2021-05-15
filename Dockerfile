FROM  node:14.16.1-buster as builder

WORKDIR /scripts

ADD app .

RUN npm install

RUN npm run build

FROM  nginx:1.19.10

COPY --from=builder /scripts/dist /usr/share/nginx/html

ADD templetes /etc/nginx/templates

CMD [ "nginx", "-g", "daemon off;" ]

EXPOSE 80
