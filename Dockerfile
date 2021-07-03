FROM node:14-slim

USER root

RUN mkdir -p /usr/src

COPY . /usr/src

WORKDIR /usr/src

RUN yarn install --prod
# start app
RUN npm run build
EXPOSE 4081:4081
CMD npm run start
