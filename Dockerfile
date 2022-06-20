FROM node:16

ENV SERVER_HOME /usr/src/postlude-api

RUN mkdir -p ${SERVER_HOME}

COPY . ${SERVER_HOME}

WORKDIR ${SERVER_HOME}

RUN yarn \
	&& yarn build \
	&& rm -rf !(dist)

CMD ["yarn", "start:prod"]