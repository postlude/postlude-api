FROM node:16

ENV SERVER_HOME /usr/src/postlude-api

RUN mkdir -p ${SERVER_HOME}

COPY . ${SERVER_HOME}

WORKDIR ${SERVER_HOME}

RUN npm i -g yarn \
    && yarn \
	&& yarn build

CMD ["node", "./dist/main.js"]