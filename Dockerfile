FROM node:14

RUN npm install -g pm2 \
    && pm2 install pm2-logrotate@latest \
    && pm2 set pm2-logrotate:rotateInterval '0 0 * * *'

ARG DISABLE_CACHE

RUN pm2 -v