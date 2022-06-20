FROM node:16

ENV SERVER_HOME /usr/src/postlude-api

RUN mkdir -p ${SERVER_HOME}

COPY . ${SERVER_HOME}

WORKDIR ${SERVER_HOME}

RUN yarn \
	&& yarn build \
	&& mv dist /tmp/ \
	&& rm -rf ./* \
	&& mv /tmp/dist .

CMD ["yarn", "start:prod"]