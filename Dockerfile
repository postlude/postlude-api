FROM node:14

ENV SERVER_HOME /usr/src/postlude-api

RUN mkdir ${SERVER_HOME}

COPY . ${SERVER_HOME}

WORKDIR ${SERVER_HOME}

RUN npm i \
    && npx pm2 install pm2-logrotate@latest \
    && npx pm2 set pm2-logrotate:rotateInterval '0 0 * * *'

CMD ["npx", "pm2-runtime", "start", "ecosystem.config.js"]