FROM alpine:latest

RUN apk add --update nodejs nodejs-npm

COPY . /app
WORKDIR /app

RUN npm install -g mocha && \
    npm install

ENTRYPOINT ["mocha"]
#
#FROM ubuntu
#
## Prevent dpkg errors
#ENV TERM=xterm-256color
#
## Set mirrors to NZ
## RUN sed -i "s/http:\/\/archive./http:\/\/nz.archive./g" /etc/apt/sources.list
#
## Install node.js
#RUN apt-get update && \
#    apt-get install nodejs -y && \
#    apt-get install npm -y
#
#COPY . /app
#WORKDIR /app
#
## Install application dependencies
#RUN npm install -g mocha && \
#    npm install
#
## Set mocha test runner as entrypoint
#ENTRYPOINT ["mocha"]
