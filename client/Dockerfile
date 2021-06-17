FROM node:alpine
USER root
WORKDIR /client
COPY . /client
RUN npm install --silent
RUN npm build